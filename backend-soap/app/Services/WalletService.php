<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Services\OtpCustom;


class WalletService {
    protected $otpCustom;

    public function __construct(OtpCustom $otpCustom) {
        $this->otpCustom = $otpCustom;
    }

    public function registerClient($params) {
        $request = (array) $params;
        Log::info("Start register client");
        try {
            $validator = Validator::make($request, [
                'document' => 'required|unique:clients',
                'name' => 'required',
                'email' => 'required|email|unique:clients',
                'cellphone' => 'required'
            ]);

            if ($validator->fails()) 
                return $this->buildResponse(false, '400', 'Validation failed', $validator->errors());
        
            $request['names'] = $request['name'];
            $client = Client::create($request);
            return $this->buildResponse(true, '00', 'The client create successfull', ['client' => $client->document]);
        } catch (\Throwable $th) {
            return $this->buildResponse(false, '400', 'Oops! There was an error, please try again.');
        }
    }

    public function topUpWallet($params) {
        $request = (array) $params;
        Log::info("Start recharge");
        try {
            $validator = Validator::make($request, [
                'document' => 'required',
                'balance' => 'required|numeric|min:0.01', 
                'cellphone' => 'required'
            ]);

            if ($validator->fails()) 
                return $this->buildResponse(false, '400', 'Validation failed', $validator->errors());

            $client = Client::where('document', $request['document'])
                            ->where('cellphone', $request['cellphone'])->first();
    
            if (!$client) 
                return $this->buildResponse(false, '404', 'Client not found', []);
    
            $balance = $request['balance'];
            $newBalance = DB::transaction(function () use ($client, $balance) {
                $wallet = $client->wallet()->firstOrCreate();
                $wallet->increment('balance', $balance);
                Log::info("TopUpWallet => Client: {$client->document} | Balance: {$balance} | At: " . now()->toDateTimeString());
                return $wallet->fresh()->balance;
            });

            return $this->buildResponse(true, '00', 'Successfull Transaction', ['new_balance' => $newBalance, 'wallet'=>$request['cellphone']]);
    
        } catch (\Exception $e) {
            return $this->buildResponse(false, '400', 'Oops! There was an error, please try again.');
        }
    }

    public function pay($params){
        $request = (array) $params;
        $validator = Validator::make($request, [
            'document' => 'required',
            'amount' => 'required|numeric|min:0.01', 
            'cellphone' => 'required'
        ]);

        if ($validator->fails()) 
            return $this->buildResponse(false, '400', 'Validation failed', $validator->errors());

        $date = now()->toDateTimeString();
        $client = Client::where('document', $request['document'])
                            ->where('cellphone', $request['cellphone'])->first();
       
        if (!$client) 
            return $this->buildResponse(false, '404', 'Client not found', []);

        $balance = $client->wallet ? $client->wallet->balance : 0;
        $sessionId = Str::uuid();
        $balance = $client->wallet ? (float) $client->wallet->balance : 0.0;
        $amount = (float) $request['amount'];

        Log::info("los valores balance {$balance} -> amount: {$amount}");

        Log::info("Start process payment: {$sessionId} | Customer: {$client->document} | At: {$date}");

        if ($balance <= 0 || $balance < $amount)
            return $this->buildResponse(false, '400', 'Insufficient balance', ["description"=>"no balance"]); 

        $otp = $this->otpCustom->generate(['documentClient' => $client->document, 'sessionId'=>$sessionId, 'amount'=>$amount]);
        $this->otpCustom->send($client->email, $client->names, $otp);
        Log:info("este es otp generado ". $otp);
        
        return $this->buildResponse(true, '00', 'Successful transaction. Please check your email to confirm the payment.', ['result'=>'OK', 'sessionId'=>$sessionId]);
    }

    public function confirm($params){
        $request = (array) $params;
        $isValid = $this->otpCustom->validate($request['sessionId'], $request['token']);
        
        if(!$isValid)
            return $this->buildResponse(false, '400', 'The payment could not be completed. Please try again.', []);

        $sessionId = $request['sessionId'];
        $session = $this->otpCustom->getSession($sessionId);
        Log::info("Start process confirm: {$sessionId} | Customer: {$session['documentClient']} | At: ". now()->toDateTimeString());
        
        $client = Client::where('document', $session['documentClient'])->first();
        $balance = $client->wallet ? (float) $client->wallet->balance : 0.0;
        $amount = (float) $session['amount'];
        
        if ($balance <= 0 || $balance < $amount) 
            return $this->buildResponse(false, '400', 'Insufficient balance', ["description"=>"no balance"]); 

        DB::transaction(function () use ($client, $amount, $sessionId) {
            $client->wallet()->decrement('balance', $amount);
            $this->otpCustom->inactive($sessionId);
            Log::info("Descuento aplicado - Sesión: {$sessionId} | Monto: {$amount} | Billetera: ". $client->cellphone. "At: ". now()->toDateTimeString());
        });

        $newBalance = $client->wallet->fresh()->balance;
        return $this->buildResponse(true, '00', 'Successfull Transaction Payment', ['new_balance' =>$newBalance, 'wallet'=>$client->cellphone]);
    }

    public function getBalance($params){
        $request = (array) $params;

        $validator = Validator::make($request, [
            'document' => 'required',
            'cellphone' => 'required'
        ]);

        if ($validator->fails()) 
            return $this->buildResponse(false, '400', 'Validation failed', $validator->errors());
        
        $client = Client::where('document', $request['document'])
                             ->where('cellphone', $request['cellphone'])->first();

        if (!$client) 
            return $this->buildResponse(false, '404', 'No information available to show', []);

        $balance = $client->wallet ? $client->wallet->balance : 0;
        return $this->buildResponse(true, '00', "The current balance is: ". (float)$balance , ['current_balance' => $balance, 'wallet'=>$request['cellphone'], 'customer'=>$client->names]);
    }

    

    private function buildResponse(bool $success, string $code, string $message, $data = []) {
        return [
            'success' => $success,
            'cod_error' => $code,
            'message' => $message,
            'data' => $data
        ];
    }
}
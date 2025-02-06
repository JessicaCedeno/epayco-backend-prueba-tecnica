<?php

namespace App\Services;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Mail;
use App\Interfaces\OtpInterface;
use App\Mail\OtpMail;

class OtpCustom implements OtpInterface 
{
    protected $expiration = 900;
    
    public function generate($data) : string {
        $otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $hashedOtp = $this->hashOtp($otp);
        $this->save(['otp'=>$hashedOtp, 'sessionId' => (string)$data['sessionId'], 'documentClient' => (string)$data['documentClient'], "amount" => $data['amount']]);
        return $otp;
    }
    private function hashOtp(string $otp) : string {
        return password_hash($otp, PASSWORD_BCRYPT);
    }
    public function validate($sessionId, $otp) : string {
        $session = $this->getSession($sessionId);
        if (!$session || !isset($session['otp'])) 
            return false;

        return $this->verifyOtp((string)$otp, $session['otp']);
    }

    public function getSession($sessionId){
        return Redis::hgetall("session:{$sessionId}");
    }

    private function verifyOtp(string $otp, string $hash) : bool {
        return password_verify($otp, $hash);
    }
    public function save($data) : void {
        Redis::hmset("session:{$data['sessionId']}", $data);
        Redis::expire("session:{$data['sessionId']}", $this->expiration);
    }
    public function send($to, $names, $otp) : void {
        Mail::to($to)->send(new OtpMail($otp, $names));
    }

    public function inactive($sessionId):void{
        Redis::del("session:{$sessionId}");
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\WalletService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SoapController extends Controller
{
    public function wsdl() {
        return response(file_get_contents(storage_path('wsdl/wallet.wsdl')), 200)->header('Content-Type', 'text/xml');
    }

    public function handle(Request $request) {
        $wsdlPath = storage_path('wsdl/wallet3.wsdl');
        $options = ['uri' => 'http://epayco.com/soap', 'soap_version' => SOAP_1_2];

        Log::info('Solicitud SOAP recibida: ' . $request->getContent());

        $walletService = app(WalletService::class);
        $server = new \SoapServer($wsdlPath, $options);
        $server->setObject($walletService); 

        Log::info('Objeto SoapServer: ' . var_export($server, true));
    
        return response($server->handle(), 200)->header('Content-Type', 'text/xml');
    }
}
<?php

namespace App\Interfaces;

interface OtpInterface 
{
    public function generate($data):string;
    public function validate($sessionId, $otp):string;
    public function send($to, $names, $otp):void;
    public function save($data):void;
    public function inactive($sessionId):void;
}

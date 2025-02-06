<?php

namespace App\Providers;

use App\Interfaces\OtpInterface;
use App\Services\OtpCustom;
use App\Services\WalletService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // $this->app->bind(OtpInterface::class, OtpCustom::class);
        $this->app->bind(OtpInterface::class, OtpCustom::class);
    
        $this->app->bind(WalletService::class, function ($app) {
            return new WalletService($app->make(OtpInterface::class));
        });

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}

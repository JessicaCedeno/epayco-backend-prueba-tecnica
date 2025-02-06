<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = ['document', 'names', 'email', 'cellphone'];

    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }
}

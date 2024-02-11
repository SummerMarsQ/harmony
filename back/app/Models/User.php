<?php

namespace App\Models;


use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory,Notifiable,HasApiTokens;

    public function likedAlbums()
    {
        return $this->belongsToMany(Album::class);
    }
    protected $fillable = [
        'id', 'username', 'password', 'picture', 'created_at', 'updated_at',
    ];
    
    public function getAuthPassword()
{
    return $this->password;
}
}

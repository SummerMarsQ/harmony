<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;
    public function band() {
        return $this->belongsTo(Band::class, 'band_id');
    }

    public function songs() {
        return $this->hasMany(Song::class);
    }

    public function likedByUsers()
{
    return $this->belongsToMany(User::class);
}

    
}

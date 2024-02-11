<?php

namespace App\Http\Controllers;

use random;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;

class UserController extends Controller
{
    public function createUser(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|max:20',
            'password' => 'required|max:500',
        ]);

        $user = User::create([
            'id' =>  mt_rand(0, 99999999999),
            'username' => $validatedData['username'],
            'password' => bcrypt($validatedData['password']),
            'picture' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    
public function loginUser(Request $request)
{
    $credentials = $request->validate([
        'username' => 'required',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
       // $token = $user->createToken('authToken')->accessToken;
        //, 'access_token' => $token
        return response()->json(['message' => 'Login successful', 'user' => $user], 200);
    } else {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
  
public static function liked(Request $request) {
    $existsInUserPreferences = DB::table('user_preferences')
        ->where('user_id', $request->input('userId'))
        ->where('preference_id', $request->input('preferenceId'))
        ->exists();

    return response()->json(['result'=>$existsInUserPreferences]);
}

public static function getAllInfo($id){
  
    $user = DB::select('SELECT * FROM users WHERE id = ?', [$id]);

    if (!isset($user[0])) {
        return null;
    }

    return $user[0];
}
public static function showPreferencesSongs($id){
    $pref = DB::select('SELECT p.type, p.id 
                        FROM user_preferences up 
                        INNER JOIN preferences p ON up.preference_id = p.id 
                        WHERE user_id = ?;', [$id]);
    
    $songs = array_map(function ($item) {
        return $item->id;
    }, array_filter($pref, function ($item) {
        return $item->type === 'song';
    }));

    $albums = array_map(function ($item) {
        return $item->id;
    }, array_filter($pref, function ($item) {
        return $item->type === 'album';
    }));

    $bands = array_map(function ($item) {
        return $item->id;
    }, array_filter($pref, function ($item) {
        return $item->type === 'band';
    }));

    $songsInfo = DB::table('songs')
    ->select('songs.id as songId','songs.name', 'songs.duration', 'albums.name as albumName', 'albums.poster', 'albums.genre' , 'albums.id as albumId')
    ->join('albums', 'songs.album_id', '=', 'albums.id')
    ->whereIn('songs.id', $songs)
    ->get();
    return $songsInfo;
}
public static function showPreferencesBands($id){
    $pref = DB::select('SELECT p.type, p.id 
                        FROM user_preferences up 
                        INNER JOIN preferences p ON up.preference_id = p.id 
                        WHERE user_id = ?;', [$id]);
    
    

    $bands = array_map(function ($item) {
        return $item->id;
    }, array_filter($pref, function ($item) {
        return $item->type === 'band';
    }));

    $bandsInfo = DB::table('bands')
    ->select('bands.id','bands.name', 'bands.listeners', 'bands.poster', 'bands.foundationYear')
    ->whereIn('bands.id', $bands)
    ->get();
    return $bandsInfo;
}

}

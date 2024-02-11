<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}) ;


Route::group(["namespace"=>"App\Http\Controllers"],function(){
    Route::post('register', "UserController@createUser");
    Route::post('login', "UserController@loginUser");
    Route::get('liked',"UserController@liked");
    Route::get('user/pref/song/{id}',"UserController@showPreferencesSongs");
    Route::get('user/pref/band/{id}',"UserController@showPreferencesBands");
    Route::get('user/{id}',"UserController@getAllInfo");
    
});


Route::group(["namespace" => "App\Http\Controllers"], function () {
    Route::get("bands", "BandController@index");
    Route::get("band/{id}/songs", "BandController@getTopSongsForBand");
    Route::get("band/{id}/albums", "BandController@getAlbumsForBand");
    Route::get("band/{id}", "BandController@showBand"); 
    Route::get("random/band", "BandController@random");
    Route::get("search/{id}","BandController@search");
    Route::post('like', "BandController@likeBand");
    Route::delete('unlike', "BandController@unlikeBand");
  
});
Route::group(["namespace"=>"App\Http\Controllers"],function(){
    Route::get("songs","SongController@index");
    Route::get("song/{id}", "SongController@showDetails");
    Route::post('like',"SongController@likeSong");
    Route::delete('unlike',"SongController@unlikeSong");
    Route::get("random/song","SongController@random");
});
Route::group(["namespace"=>"App\Http\Controllers"],function(){
    Route::get("albums","AlbumController@index");
    Route::get("album/{id}", "AlbumController@showAlbum");
    Route::get("album/songs/{id}","AlbumController@showSongs");
    Route::get("album/otheralbums/{id}","AlbumController@showOtherAlbums");
    Route::post('like',"AlbumController@likeAlbum");
    Route::delete('unlike',"AlbumController@unlikeAlbum");
    Route::get("random/album","AlbumController@random");
    Route::get("all/{id}","AlbumController@albumsByBand");
});

<?php

namespace App\Http\Controllers;

use mt;
use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlbumController extends Controller
{
    public static function index(){
        $albums = DB::select('SELECT a.*,b.poster as bandPoster, b.name as bandName FROM albums a INNER JOIN bands b on a.band_id = b.id ');
        return $albums;
    }

    public static function showAlbum($id){
        $album = DB::select("SELECT a.*, b.poster as bandPoster, b.name as bandName FROM albums a INNER JOIN bands b ON a.band_id = b.id WHERE a.id = ?", [$id]);
    
        return isset($album[0]) ? $album[0] : null;
    }

    public static function showSongs($id){
        $songs = DB::select("SELECT s.id,s.name,s.duration,s.audios,s.link FROM songs s INNER JOIN albums a ON s.album_id = a.id WHERE s.album_id = ?", [$id]);
        return $songs;
    }

    public static function showOtherAlbums($id){
        $albums = DB::select("SELECT a.id,a.name,a.year,a.date,b.name as bandName , a.poster FROM albums a INNER JOIN bands b ON a.band_id = b.id WHERE b.id = ?", [$id]);
        return $albums;
    }
    

    public function likeAlbum(Request $request)
    {
        DB::table('user_preferences')->insert([
        'id' => mt_rand(0, 99999999999),
        'user_id' => $request->input('userId'),
        'preference_id' => $request->input('preferenceId'),
        'preference_date' => today()
    ]);
    return response()->json(['message' => 'Preference created successfully'], 201);
}

    public function unlikeAlbum(Request $request)
    {
        $userId = $request->input('userId');
        $preferenceId = $request->input('preferenceId');
        $affectedRows = DB::delete('DELETE FROM user_preferences WHERE user_id = ? AND preference_id = ? ', [$userId,$preferenceId]);
        if ($affectedRows > 0) {
            return response()->json(['message' => 'Record deleted successfully']);
        } else {
            return response()->json(['message' => 'Record not found or already deleted'], 404);
        }
    }

    public function random()
{
    $result = DB::table('albums')->inRandomOrder()->first();
    return $result;
}

public function albumsByBand($id)
    {
        $albums = DB::select('SELECT a.*,b.poster as bandPoster, b.name as bandName FROM albums a INNER JOIN bands b on a.band_id = b.id WHERE b.id = ?', [$id]);
        return $albums;
    }
}

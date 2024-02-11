<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Song;
use Illuminate\Support\Facades\DB;
class SongController extends Controller
{
    public static function index(){
        $songs = DB::select('SELECT * FROM songs');
        return $songs;
    }

    public static function showDetails($id){
        $song = DB::select('SELECT s.id , a.poster as albumPoster,s.name, s.link,b.id as bandId , b.name as bandName,a.name as albumName, b.poster as bandPoster,a.year,a.date,s.audios,s.duration,a.id as albumId FROM songs s inner join albums a on s.album_id = a.id inner join bands b on a.band_id = b.id WHERE s.id = ?;',[$id]);
        return isset($song[0]) ? $song[0] : null;
    }

    public function liekSong(Request $request)
    {
        DB::table('user_preferences')->insert([
        'id' => mt_rand(0, 99999999999),
        'user_id' => $request->input('userId'),
        'preference_id' => $request->input('preferenceId'),
        'preference_date' => today()
    ]);
    return response()->json(['message' => 'Preference created successfully'], 201);
}

    public function unlikeSong(Request $request)
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
    $result = DB::table('songs')->inRandomOrder()->first();
    return $result;
}

    
}

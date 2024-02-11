<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Band;
use Illuminate\Support\Facades\DB;

class BandController extends Controller
{
    public static function index()
    {
        $bands = DB::select('SELECT * FROM bands');
        return $bands;
    }

    public static function showBand($bandId)
    {
        $band = DB::table('bands')->where('id', $bandId)->first();
        return $band;
    }

    public function getTopSongsForBand($bandId)
    {
        $songs = DB::select("
            SELECT s.*, a.date, a.year, a.genre, a.name as albumName, a.poster as albumPoster, a.band_id,
            b.foundationYear, b.listeners, b.name as bandName, b.poster as bandPoster
            FROM songs s
            INNER JOIN albums a ON s.album_id = a.id
            INNER JOIN bands b ON a.band_id = b.id
            WHERE b.id = ?
            ORDER BY s.audios DESC
            LIMIT 7;
        ", [$bandId]);

        return $songs;
    }

    public function search($id){
        $bands = DB::select("SELECT * FROM bands WHERE name LIKE '%$id%'");
        return $bands;
    }

    public function getAlbumsForBand($bandId)
    {
        $albums = DB::select("
            SELECT a.*, b.name as bandName, b.listeners, b.foundationYear, b.poster as bandPoster
            FROM bands b
            INNER JOIN albums a ON a.band_id = b.id
            WHERE b.id = ?
            LIMIT 6;
        ", [$bandId]);

        return $albums;
    }

    public function likeBand(Request $request)
    {
        DB::table('user_preferences')->insert([
            'id' => mt_rand(0, 99999999999),
            'user_id' => $request->input('userId'),
            'preference_id' => $request->input('preferenceId'),
            'preference_date' => today()
        ]);

        return response()->json(['message' => 'Preference created successfully'], 201);
    }

    public function unlikeBand(Request $request)
    {
        $userId = $request->input('userId');
        $preferenceId = $request->input('preferenceId');

        $affectedRows = DB::delete('DELETE FROM user_preferences WHERE user_id = ? AND preference_id = ? ', [$userId, $preferenceId]);

        if ($affectedRows > 0) {
            return response()->json(['message' => 'Record deleted successfully']);
        } else {
            return response()->json(['message' => 'Record not found or already deleted'], 404);
        }
    }

    public function random()
{
    $result = DB::table('bands')->inRandomOrder()->first();
    return $result;
}
}

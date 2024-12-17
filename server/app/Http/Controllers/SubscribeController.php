<?php

namespace App\Http\Controllers;

use App\Models\Subscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscribeController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Subscribe Failed',
                'data' => null,
                'error' => $validator->errors()
            ]);
        }

        $subscription = new Subscribe();
        $subscription->email = $request->email;
        $subscription->save();

        return response()->json([
            'status' => true,
            'message' => 'Successfully Subscribe',
            'data' => [
                'id' => $subscription->id,
                'email' => $subscription->email,
                'created_at' => date_format($subscription->created_at,'d-m-y'),
            ],
            'error' => null
        ]);
    }
}

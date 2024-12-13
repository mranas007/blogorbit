<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    // Login Method
    public function login(Request $request) // <<<<<<<<<<<<<<<<<<<<  complated >>>>>>>>>>>>>>>>>>>> //
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation errors',
                'data' => null,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Fetch user by email
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid email or password',
                'data' => null,
                'errors' => null,
            ], 401);
        }

        // Generate token
        $token = $user->createToken('UserAuthToken')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'User logged in successfully',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'token' => $token,
            ],
            'errors' => null,
        ], 200);
    }

    // Register Method
    public function register(Request $request) // <<<<<<<<<<<<<<<<<<<<  complated >>>>>>>>>>>>>>>>>>>> //
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:20',
            'username' => 'required|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation errors',
                'data' => null,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create the user
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'username' => $request->username,
            ]);

            // Generate token
            $token = $user->createToken('UserAuthToken')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'User registered successfully',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'token' => $token,
                ],
                'errors' => null,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while creating the user',
                'data' => null,
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}

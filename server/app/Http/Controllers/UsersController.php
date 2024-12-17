<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isEmpty;

class UsersController extends Controller
{
        // This method will return all Users 
    public function indexUsers() // <<<<<<<<<<<<<<<<<<<<  not approved >>>>>>>>>>>>>>>>>>>>
    {
        $users = User::all();
        
        if(!$users){
            return response()->json([
                'status' => false,
                'message'=> 'user not found!',
                'users' => null,
                'error'=> 'user not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'message'=> 'success',
            'users' => $users,
            'error'=> null
        ]);
    }

    // This method will return a single User
    public function showUser($id) // <<<<<<<<<<<<<<<<<<<<  not approved >>>>>>>>>>>>>>>>>>>>
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'user' => $user,
        ]);
    }

    // This method will update a User 
    public function updateUser(Request $request, $id) // <<<<<<<<<<<<<<<<<<<<  not approved >>>>>>>>>>>>>>>>>>>>
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'nullable|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user->name = $request->input('name', $user->name);
        $user->email = $request->input('email', $user->email);
        if ($request->filled('password')) {
            $user->password = bcrypt($request->input('password'));
        }
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'User updated successfully!',
            'user' => $user,
        ]);
    }

    // This method will delete a User
    public function destroyUser($id) // <<<<<<<<<<<<<<<<<<<<  not approved >>>>>>>>>>>>>>>>>>>>
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'User deleted successfully!',
        ]);
    }
}

<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserBlogController;
use App\Http\Controllers\UserAuthController;

Route::prefix('api/v1')->group(function () {

    // ----------------------
    // Authentication Routes
    // ----------------------
    Route::post("register", [UserAuthController::class, 'register']); // Register a new user
    Route::post("login", [UserAuthController::class, 'login']);       // Log in an existing user

    // ----------------------
    // Protected Routes (Require Authentication)
    // ----------------------
    Route::group(["middleware" => "auth:sanctum"], function () {

        // ------------------
        // User Routes
        // ------------------
        Route::get("user", [UsersController::class, 'indexUsers']);  // Fetch all users
        Route::get("user/{id}", [UsersController::class, 'showUser']); // Fetch a single user by ID

        // ------------------
        // Blog Routes
        // ------------------
        Route::get("blog", [BlogController::class, 'indexBlog']);  // Fetch a single blog
        Route::get("blogs", [BlogController::class, 'showBlogs']); // Fetch all blogs
        
        // ------------------
        // User Blogs Routes (Specific to User's Blogs)
        // ------------------
        Route::get("blog/user/{id}", [UserBlogController::class, 'indexBlog']); // Fetch a single blog by a user
        Route::get("blogs/user/{id}", [UserBlogController::class, 'showBlogs']); // Fetch all blogs by a user
        Route::post("blog/user", [UserBlogController::class, 'storeBlog']); // Create a new blog
        Route::patch("blog/user/update/{id}", [UserBlogController::class, 'updateBlog']); // Create a new blog
    });
    
});

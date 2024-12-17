<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserBlogController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\SubscribeController;

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
        // Subscribe Routes
        // ------------------
        Route::post("subscribe", [SubscribeController::class, 'store']);  // Subscrribe

        // ------------------
        // User Routes
        // ------------------
        Route::get("user", [UsersController::class, 'indexUsers']);  // Fetch all users
        Route::get("user/{id}", [UsersController::class, 'showUser']); // Fetch a single user by ID

        // ------------------
        // Blog Routes
        // ------------------
        Route::get("blog/all", [BlogController::class, 'showBlogs']); // Fetch all blogs
        Route::get("blog/{id}", [BlogController::class, 'indexBlog']);  // Fetch a single blog
        
        // ------------------
        // User Blogs Routes (Specific to User's Blogs)
        // ------------------
        Route::get("/user/blog/{id}", [UserBlogController::class, 'indexBlog']); // Fetch a single blog by a user
        Route::get("/user/blog/all/{id}", [UserBlogController::class, 'showBlogs']); // Fetch all blogs by a user
        Route::post("/user/blog/store", [UserBlogController::class, 'storeBlog']); // Create a new blog
        Route::patch("/user/blog/update/{id}", [UserBlogController::class, 'updateBlog']); // update a blog
        Route::delete("/user/blog/delete/{id}", [UserBlogController::class, 'deleteBlog']); // update a blog
    });
    
});

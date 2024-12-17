<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    // this method will return ONE blogs
    public function indexBlog($id)
    {
        try {
            // Fetch blogs with authors
            $blog =  DB::table('blogs')
                ->join('users', 'blogs.author_id', '=', 'users.id') // Perform the join
                ->select(
                    'users.id AS author_id',
                    'users.name AS author_name',
                    'users.profile_picture AS author_image',
                    'blogs.id',
                    'blogs.title',
                    'blogs.image',
                    'blogs.content',
                    'blogs.category',
                    'blogs.created_at'
                )
                ->where('blogs.id', $id) // Filter by author_id
                ->orderByDesc('blogs.id')
                ->get();

            // Check if the blogs collection is empty
            if ($blog->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'No blogs found.',
                    'data' => null,
                    'error' => null,
                ], 404);
            }

            // Map and format the response
            return response()->json([
                'status' => true,
                'blogs' => [
                    "author_id" => $blog->author_id,
                    "author_name" => $blog->author_name,
                    "author_image" => $blog->author_image,
                    "id" => $blog->id,
                    "title" => $blog->title,
                    "image" => $blog->image ? url('uploads/temp/' . basename($blog->image)) : null,
                    "content" => $blog->content,
                    "category" => $blog->category,
                    "created_at" => date('Y-m-d', strtotime($blog->created_at)),
                ],
            ]);
        } catch (\Exception $e) {
            // Handle errors
            return response()->json([
                'status' => false,
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // this method will return a ALL blog
    public function showBlogs(Request $request)
    {
        try {
            // Define pagination parameters
            $perPage = 15;

            // Fetch blogs with authors using Eloquent with pagination
            $blogs = DB::table('blogs')
                ->join('users', 'blogs.author_id', '=', 'users.id') // Perform the join
                ->select(
                    'users.id AS author_id',
                    'users.name AS author_name',
                    'users.profile_picture AS author_image',
                    'blogs.id',
                    'blogs.title',
                    'blogs.image',
                    'blogs.content',
                    'blogs.category',
                    'blogs.created_at'
                )
                ->orderByDesc('blogs.id')
                ->paginate($perPage); // Paginate with 15 items per page

            // Check if the blogs collection is empty
            if ($blogs->total() === 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'No blogs found.',
                    'data' => null,
                    'error' => null,
                ], 404);
            }

            // Transform the paginated blogs' data
            $transformedBlogs = collect($blogs->items())->map(function ($blog) {
                return [
                    "author_id" => $blog->author_id,
                    "author_name" => $blog->author_name,
                    "author_image" => $blog->author_image,
                    "id" => $blog->id,
                    "title" => $blog->title,
                    "image" => $blog->image ? url('uploads/temp/' . basename($blog->image)) : null,
                    "content" => $blog->content,
                    "created_at" => date('Y-m-d', strtotime($blog->created_at)), // Proper date formatting
                ];
            });

            // Return paginated response
            return response()->json([
                'status' => true,
                'message' => 'Success',
                'blogs' => $transformedBlogs,
                'pagination' => [
                    'current_page' => $blogs->currentPage(),
                    'per_page' => $blogs->perPage(),
                    'total' => $blogs->total(),
                    'last_page' => $blogs->lastPage(),
                ],
                'error' => null
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred.',
                'data' => null,
                'error' => $e->getMessage(), // Remove in production for security reasons
            ], 500);
        }
    }





    // this method will update a blog
    public function updateBlog() {}

    // this method will delete a blog

    public function deleteBlog() {}
}

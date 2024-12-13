<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    // this method will return ONE blogs
    public function indexBlogs($id)
    {
        try {
            // Fetch blogs with authors
            $blogs = DB::table('blogs')
                ->join('users', 'blogs.author_id', '=', 'users.id')
                ->select(
                    'users.id AS author_id',
                    'users.name AS author_name',
                    'users.profile_picture AS author_image',
                    'blogs.id',
                    'blogs.title',
                    'blogs.image',
                    'blogs.content',
                    DB::raw("DATE(blogs.created_at) as created_at")
                )
                ->where("blog.id", $id)
                ->first();

            // Check if the blogs collection is empty
            if ($blogs->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'No blogs found.',
                ], 404);
            }

            // Map and format the response
            return response()->json([
                'status' => true,
                'blogs' => $blogs,
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
    public function showBlogs() // <<<<<<<<<<<<<<<<<<<< Show All Blogs "complated" >>>>>>>>>>>>>>>>>>>>
    {
        try {
            // Fetch blogs with authors
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
                    DB::raw("DATE(blogs.created_at) as created_at") // Format date in SQL
                )
                ->orderByDesc("blogs.id")
                ->get();

            // Check if the blogs collection is empty
            if ($blogs->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'No blogs found.',
                ], 404);
            }

            // Map and format the response
            return response()->json([
                'status' => true,
                'blogs' => $blogs->map(function ($blog) {
                    return [
                        "id" => $blog->id,
                        "title" => $blog->title,
                        "image" => $blog->image,
                        "content" => $blog->content,
                        "created_at" => $blog->created_at,
                        "author_id" => $blog->author_id,
                        "author_name" => $blog->author_name,
                        "author_image" => $blog->author_image,
                    ];
                }),
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

    

    // this method will update a blog
    public function updateBlog() {}

    // this method will delete a blog

    public function deleteBlog() {}
}

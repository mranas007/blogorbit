<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserBlogController extends Controller
{

    public function indexBlog($id) // <<<<<<<<<<<<<<<<<<<< Show ONE User's Blog by Blog ID >>>>>>>>>>>>>>>>>>>>
    {
        try {
            // Use Query Builder to fetch the blog with LEFT JOIN
            $blog = DB::table('blogs')
                ->leftJoin('users', 'blogs.author_id', '=', 'users.id')
                ->select(
                    'users.id AS author_id', // Alias for user ID
                    'users.name AS author_name',
                    'users.profile_picture AS author_image',
                    'blogs.id',
                    'blogs.title',
                    'blogs.image',
                    'blogs.content',
                    'blogs.category',
                    'blogs.created_at'
                )
                ->where('blogs.id', $id) // Explicitly check the blog ID
                ->first(); // Use `first()` to fetch a single record

            // Check if a blog was found
            if (!$blog) {
                return response()->json([
                    'status' => false,
                    'message' => 'Sorry, no blog found with the given ID!',
                    'blog' => null,
                ], 404);
            }

            // Format and return the response
            return response()->json([
                'status' => true,
                'message' => 'Blog retrieved successfully!',
                'blog' => [
                    "author_id" => $blog->author_id,
                    "author_name" => $blog->author_name,
                    "author_image" => $blog->author_image,
                    "id" => $blog->id,
                    "title" => $blog->title,
                    "image" => $blog->image ? url($blog->image) : null,
                    "content" => $blog->content,
                    "category" => $blog->category,
                    "created_at" => date('Y-m-d', strtotime($blog->created_at)), // Proper date formatting
                ],
            ], 200);
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while fetching the blog',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function showBlogs($id) // <<<<<<<<<<<<<<<<<<<< Show All User's Blogs by User Id >>>>>>>>>>>>>>>>>>>> //
    {
        // Query to fetch blogs with the author's information
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
                'blogs.created_at'
            )
            ->where('blogs.author_id', $id) // Filter by author_id
            ->orderByDesc('blogs.id')
            ->get();

        // Check if no blogs were found
        if ($blogs->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Sorry, there are no blogs for this user!',
            ]);
        }

        // Format and return the response
        return response()->json([
            'status' => true,
            'message' => 'User Blogs!',
            'blogs' => $blogs->map(function ($blog) {
                return [
                    "author_id" => $blog->author_id,
                    "author_name" => $blog->author_name,
                    "author_image" => $blog->author_image,
                    "id" => $blog->id,
                    "title" => $blog->title,
                    "image" => $blog->image ?  url('uploads/temp/' . basename($blog->image)) : null,
                    "content" => $blog->content,
                    "created_at" => date('Y-m-d', strtotime($blog->created_at)), // Proper date formatting
                ];
            }),
        ]);
    }

    // this method will store a blog
    public function storeBlog(Request $request)  // <<<<<<<<<<<<<<<<<<<< store blog Completed >>>>>>>>>>>>>>>>>>>> //
    {
        $validator = Validator::make($request->all(), [
            'author_id' => 'required',
            'title' => 'required|min:10|max:60',
            'category' => 'required',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }

        $blog = new Blog();
        $blog->author_id = $request->author_id;
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title);
        $blog->category = $request->category;
        $blog->content = $request->content;

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Improved file naming and path handling
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/temp'), $imageName);

            // Correct path concatenation
            $blog->image = 'public/uploads/temp/' . $imageName;
        }

        $blog->save();
        return response()->json([
            'status' => true,
            'message' => 'Blog created successfully!',
            'blog' => $blog,
        ]);
    }

    // This method will update a blog
    public function updateBlog(Request $request, $id)  // <<<<<<<<<<<<<<<<<<<< Updating blog Completed >>>>>>>>>>>>>>>>>>>> //
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255', // Only validate if provided
            'category' => 'sometimes|required|string',      // Only validate if provided
            'content' => 'sometimes|required|string',       // Only validate if provided
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation errors',
                'data' => null,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Attempt to find the blog
            $blog = DB::table('blogs')->where('id', $id)->first();

            // Check if the blog exists
            if (!$blog) {
                return response()->json([
                    'status' => false,
                    'message' => 'Blog not found!',
                    'data' => null,
                    'errors' => null,
                ], 404);
            }

            // Prepare update data
            $updateData = $request->only(['title', 'content', 'category']);

            // Generate slug if the title is provided
            if ($request->has('title')) {
                $updateData['slug'] = Str::slug($request->title);
            }

            $updateData['updated_at'] = now();

            // Update the blog
            DB::table('blogs')
                ->where('id', $id)
                ->update($updateData);

            // Return success response
            return response()->json([
                'status' => true,
                'message' => 'Blog updated successfully!',
                'data' => $updateData,
                'errors' => null,
            ], 200);
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while updating the blog',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // this method will delete a blog
    public function deleteBlog($id)  // <<<<<<<<<<<<<<<<<<<< Deleting blog Completed >>>>>>>>>>>>>>>>>>>> //
    {
        try {
            // Attempt to find the blog by ID
            $blog = DB::table('blogs')->where('id', $id)->first();

            // Check if the blog exists
            if (!$blog) {
                return response()->json([
                    'status' => false,
                    'message' => 'Blog not found!',
                    'data' => null,
                    'errors' => null,
                ], 404);
            }

            // Delete the blog
            if ($blog->image) {
                // Construct the file path
                $imagePath = public_path('uploads/temp/' . basename($blog->image));

                // Check if the file exists
                if (file_exists($imagePath)) {
                    unlink($imagePath); // Delete the file
                }
            }

            DB::table('blogs')->where('id', $id)->delete();

            // Return success response
            return response()->json([
                'status' => true,
                'message' => 'Blog deleted successfully!',
                'data' => null,
                'errors' => null,
            ], 200);
            
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while deleting the blog',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

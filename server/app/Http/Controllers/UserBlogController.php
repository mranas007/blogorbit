<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserBlogController extends Controller
{

    public function indexBlog($id) // <<<<<<<<<<<<<<<<<<<< Show ONE User's Blog by User "Id" >>>>>>>>>>>>>>>>>>>>
    {
        // Use Query Builder to fetch the blog with LEFT JOIN
        $blog = DB::table('blogs')
            ->leftJoin('users', 'blogs.author_id', '=', 'users.id')
            ->select(
                'users.id AS author_id', // Corrected alias for user ID
                'users.name AS author_name',
                'users.profile_picture AS author_image',
                'blogs.id',
                'blogs.title',
                'blogs.image',
                'blogs.content',
                'blogs.created_at'
            )
            ->where('blogs.id', $id) // Explicitly check the blog ID
            ->get(); // Use `first()` for fetching a single record

        // Check if a blog was found
        if (!$blog) {
            return response()->json([
                'status' => false,
                'message' => 'Sorry, no blog found for this user!',
            ]);
        }

        // Return the response with the blog data
        return response()->json([
            'status' => true,
            'message' => 'User Blog!',
            'blog' => $blog,
        ]);
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
                    "image" => $blog->image,
                    "content" => $blog->content,
                    "created_at" => date('Y-m-d', strtotime($blog->created_at)), // Proper date formatting
                ];
            }),
        ]);
    }

    // this method will store a blog
    public function storeBlog(Request $request) // <<<<<<<<<<<<<<<<<<<< create blog Completed >>>>>>>>>>>>>>>>>>>>
    {

        $validator = validator::make($request->all(), [
            'author_id' => 'required',
            'title' => 'required|min:10|max:60',
            'slug' => 'required',
            'category' => 'required',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Please fix the error',
                'errors' => $validator->errors(),
            ]);
        }

        $blog = new Blog();
        $blog->author_id = $request->author_id;
        $blog->title = $request->title;
        $blog->slug = $request->slug;
        $blog->category = $request->category;
        $blog->content = $request->content;

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $imageName = time() . '_' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/temp'), $imageName);
            $blog->image = 'public/uploads/temp' . $imageName;
        }

        $blog->save();
        return response()->json([
            'status' => true,
            'message' => 'Blog created successfully!',
            'blog' => $blog,
        ]);
    }

    // This method will update a blog
    public function updateBlog(Request $request, $id) // <<<<<<<<<<<<<<<<<<<< Update Blog by ID >>>>>>>>>>>>>>>>>>>> //
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
            $updateData['updated_at'] = now(); // Add updated_at timestamp

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

    public function deleteBlog() {}
}

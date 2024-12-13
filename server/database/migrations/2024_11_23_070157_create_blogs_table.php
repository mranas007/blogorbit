<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Blog title
            $table->string('slug')->unique(); // SEO-friendly URL
            $table->string('category'); // Blog category
            $table->string('image')->nullable(); // Featured image, optional
            $table->text('content'); // Main blog content
            $table->unsignedBigInteger('author_id'); // Reference to the author
            // $table->enum('status', ['draft', 'published', 'archived'])->default('draft'); // Blog status
            $table->timestamps(); // Created and updated timestamps

            // Add foreign key constraint
            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};

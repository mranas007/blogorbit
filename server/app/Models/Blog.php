<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    // Define the relationship to the User model
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public static function getAll($request)
    {

        $query = TodoList::with('category');

        if (!is_null($request->category)) {
            $query->where('category_id', '=', $request->category);
        }
        return $query->get();
    }
}

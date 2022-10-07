<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Category;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TodoListController extends Controller
{
    public function getAllTodoList(Request $request)
    {
        $todoLists = TodoList::getAll($request);
        $categories = Category::all();
        return response([
            "todoLists" => $todoLists,
            "categories" => $categories,
        ], 200);
    }

    public function postTodoList(Request $request)
    {
        $todoList = new TodoList();
        $todoList->value = $request->value;

        if (!empty($request->category)) {
            $object = Category::updateOrCreate($request->category);
            $todoList->category()->associate($object);
        }
        $todoList->save();
        return response([
            "todoList" => $todoList,
            "message" => 'Ajouter'
        ], 200);
    }

    public function deleteTodoList(Request $request)
    {
        $todoList = TodoList::find($request->id);
        $todoList->delete();
        return response([
            "message" => 'Supprimer'
        ], 200);
    }

    public function updateTodoList(Request $request)
    {
        $todoList = TodoList::with('category')->find($request->id);
        foreach ($request->all() as $key => $param) {
            if (!is_null($param)) {
                if (!is_array($param)) {
                    $todoList->$key = $param;
                } else {
                    $class = 'App\Models\\' . Str::ucfirst($key);
                    $object = $class::updateOrCreate($param);
                    $todoList->$key()->associate($object);
                }
            }
        }
        $todoList->save();

        return response([
            "todoList" => $todoList,
            "message" => 'Editer'
        ], 200);
    }
}

<?php

use App\Http\Controllers\TodoListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
    'middleware' => ['api', 'cors'],
], function ($router) {
    Route::get('/todolist', [TodoListController::class, 'getAllTodoList']);

    Route::post('/todolist', [TodoListController::class, 'postTodoList']);

    Route::delete('/todolist', [TodoListController::class, 'deleteTodoList']);

    Route::put('/todolist/{id}', [TodoListController::class, 'updateTodoList']);
});

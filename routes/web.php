<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ContactController;

// Home page route
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('home');

// Contact form submission route
Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');

// Dashboard route (with ContactController index method)
Route::get('dashboard', [ContactController::class, 'index'], function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Delete contact route
Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('contacts.destroy');

require __DIR__.'/settings.php';

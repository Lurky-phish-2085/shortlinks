<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortLinkController;
use App\Models\ShortLink;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', function (Request $request): Response | RedirectResponse {
    $isUserAuthenticated = !is_null($request->user());
    if ($isUserAuthenticated) {
        return redirect(route('dashboard'));
    }

    $generatedShortLinkID = $request->session()->get('generatedID');

    return Inertia::render('Welcome', [
        'generatedURL' => $generatedShortLinkID,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('short-links', ShortLinkController::class)
    ->only(['store']);

require __DIR__ . '/auth.php';

Route::get('/{retrievalID}', function (Request $request, $retrievalID): RedirectResponse {
    $shortLink = ShortLink::where('retrieval_Id', $retrievalID)->first();

    if (is_null($shortLink)) {
        abort(404);
    }

    return redirect(url($shortLink->target_url));
});

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
    $generatedShortLinkID = $request->session()->get('generatedID');

    return Inertia::render('Welcome', [
        'generatedURL' => $generatedShortLinkID,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('guest')->name('home');

Route::get('/dashboard', function (Request $request) {
    $generatedShortLinkID = $request->session()->get('generatedID');
    $shortLinks = $request->user()->shortLinks()->whereNot('deleted', true)->latest()->get();

    return Inertia::render('Dashboard', [
        'generatedURL' => $generatedShortLinkID,
        'shortLinks' => $shortLinks,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('short-links', ShortLinkController::class)
    ->only(['index', 'store', 'update', 'destroy']);

require __DIR__ . '/auth.php';

Route::get('/{retrievalID}', function (string $retrievalID): RedirectResponse {
    $shortLink = ShortLink::where('retrieval_Id', $retrievalID)->first();

    $notAvailable = is_null($shortLink) || $shortLink->disabled || $shortLink->deleted;

    if ($notAvailable) {
        abort(404);
    }

    $shortLink->incrementClicks();

    return redirect(url($shortLink->target_url));
})->name('short-link-redirect');

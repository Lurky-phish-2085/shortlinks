<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\ShortLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

const MAX_URL_LENGTH = 2048;

/**
 * Regular expression to validate URLs.
 * - Ensures the URL starts with "http://" or "https://".
 * - Requires a valid domain name, including optional subdomains.
 * - Allows an optional port number (e.g., :8080).
 * - Allows an optional path, query string, or fragment.
 */
const VALID_URL_REGEX = '/^https?:\/\/([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/';

class ShortLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): RedirectResponse
    {
        $nextRoute = Auth::check() ? 'dashboard' : 'home';

        return redirect(route($nextRoute))->with([
            'generatedID' => $request->session()->get('generatedID'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'targetURL' => [
                'required',
                'string',
                'max:' . MAX_URL_LENGTH,
                'regex:' . VALID_URL_REGEX,
            ],
            'title' => 'nullable|string|max:80'
        ]);

        $shortLink = null;
        if (Auth::check()) {
            $shortLink = $request->user()->shortLinks()->create([
                'target_url' => $validated['targetURL'],
                'title' => $validated['title'],
            ]);
        } else {
            $shortLink = ShortLink::create([
                'target_url' => $validated['targetURL'],
            ]);
        }

        return redirect(route('short-links.index'))->with([
            'generatedID' => $shortLink->retrieval_id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ShortLink $shortLink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShortLink $shortLink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShortLink $shortLink)
    {
        Gate::authorize('update', $shortLink);

        $validated = $request->validate([
            'title' => 'string|max:80',
            'disabled' => 'boolean',
            'deleted' => 'boolean',
        ]);

        $shortLink->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShortLink $shortLink)
    {
        Gate::authorize('delete', $shortLink);

        $shortLink->update([
            'deleted' => true
        ]);
    }
}

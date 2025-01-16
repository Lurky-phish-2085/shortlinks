<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\ShortLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

const MAX_URL_LENGTH = 2048;
const ALPHANUMERIC_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz' .
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' .
    '0123456789';

const RETIREVAL_ID_LENGTH = 8;

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
        $generateRetrievalID = function (): string {
            $generateRandomAlphaNum = function (): string {
                mt_srand(time());

                $alphaNum = '';
                foreach (range(1, RETIREVAL_ID_LENGTH) as $i) {
                    $alphaNumCharsLength = strlen(ALPHANUMERIC_CHARACTERS);
                    $randomIndex = mt_rand(0, $alphaNumCharsLength - 1);

                    $alphaNum .= ALPHANUMERIC_CHARACTERS[$randomIndex];
                }

                return $alphaNum;
            };
            $retrievalIDExists = function ($retrievalID): bool {
                return ShortLink::where('retrieval_Id', $retrievalID)->exists();
            };

            $generatedID = $generateRandomAlphaNum();
            while ($retrievalIDExists($generatedID)) {
                $generatedID = $generateRandomAlphaNum();
            }

            return $generatedID;
        };

        $validated = $request->validate([
            'targetURL' => [
                'required',
                'string',
                'max:' . MAX_URL_LENGTH,
                'regex:' . VALID_URL_REGEX,
            ]
        ]);

        $shortLink = null;
        if (Auth::check()) {
            $shortLink = $request->user()->shortLinks()->create([
                'retrieval_Id' => $generateRetrievalID(),
                'target_url' => $validated['targetURL'],
            ]);
        } else {
            $shortLink = ShortLink::create([
                'retrieval_Id' => $generateRetrievalID(),
                'target_url' => $validated['targetURL'],
            ]);
        }


        return redirect(route('short-links.index'))->with([
            'generatedID' => $shortLink->retrieval_Id,
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShortLink $shortLink)
    {
        //
    }
}

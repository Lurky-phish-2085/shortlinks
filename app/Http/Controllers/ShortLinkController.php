<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\ShortLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

const MAX_URL_LENGTH = 2048;
const ALPHANUMERIC_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz' .
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' .
    '0123456789';

const SHORLINK_GENERATED_RETRIEVAL_ID_LENGTH = 8;

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
    public function index()
    {
        //
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
            ]
        ]);

        $generateRetrievalID = function (): string {
            mt_srand(time());

            $generatedID = '';
            foreach (range(1, 8) as $i) {
                $alphaNumCharsLength = strlen(ALPHANUMERIC_CHARACTERS);
                $randomIndex = mt_rand(0, $alphaNumCharsLength - 1);

                $generatedID .= ALPHANUMERIC_CHARACTERS[$randomIndex];
            }

            return $generatedID;
        };

        $shortLink = ShortLink::create([
            'retrieval_Id' => $generateRetrievalID(),
            'target_url' => $validated['targetURL'],
        ]);

        return redirect(route('home'))->with([
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

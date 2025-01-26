<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

const ALPHANUMERIC_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz' .
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' .
    '0123456789';

const RETIREVAL_ID_LENGTH = 8;

class ShortLink extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'title',
        'target_url',
        'disabled',
        'deleted',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (ShortLink $model) {
            $model->retrieval_id = $model->generateRetrievalID();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function incrementClicks(): void
    {
        $this->increment('clicks');
        $this->save();
    }

    private function generateRetrievalID(): string
    {
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
        $retrievalIDExists = function (string $retrievalID): bool {
            return ShortLink::where('retrieval_id', $retrievalID)->exists();
        };

        $generatedID = $generateRandomAlphaNum();
        while ($retrievalIDExists($generatedID)) {
            $generatedID = $generateRandomAlphaNum();
        }

        return $generatedID;
    }
}

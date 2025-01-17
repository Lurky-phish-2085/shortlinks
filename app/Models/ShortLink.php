<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShortLink extends Model
{
    protected $fillable = [
        'title',
        'target_url',
        'disabled',
        'deleted',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function incrementClicks(): void
    {
        $this->increment('clicks');
        $this->save();
    }
}

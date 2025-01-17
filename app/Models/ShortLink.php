<?php

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
}

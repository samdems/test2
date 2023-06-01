<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    protected $fillable = [
        'date',
        'start_time',
        'end_time',
        'title',
        'agenda',
        'attendees',
    ];

    public function attendees()
    {
        return $this->belongsToMany(User::class, 'attendees', 'meeting_id', 'user_id');
    }
}

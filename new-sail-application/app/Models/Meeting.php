<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{

    use HasFactory;
    protected $fillable = [
        'date',
        'start_time',
        'end_time',
        'title',
        'agenda',
        'attendees',
        'organization_id',
    ];

    public function attendees()
    {
        return $this->belongsToMany(User::class, 'attendees', 'meeting_id', 'user_id');
    }
     public function organization()
    {
         return $this->belongsTo(Organization::class, 'organization_id');
    }
}

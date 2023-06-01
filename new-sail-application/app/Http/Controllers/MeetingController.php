<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeetingRequest;
use App\Http\Requests\UpdateMeetingRequest;
use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $meetings = Meeting::with('attendees')->get();

        return response()->json($meetings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreMeetingRequest $request)
    {
        $meeting = Meeting::create([
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'title' => $request->title,
            'agenda' => $request->agenda, 
            'organization_id' => $request->organization
        ]);

        $meeting->attendees()->sync($request->attendees);

        return response()->json($meeting, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Meeting $meeting)
    {
        $meeting->load(['attendees','organization']);

        return response()->json($meeting);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateMeetingRequest $request, Meeting $meeting)
    {
        $meeting->update([
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'title' => $request->title,
            'agenda' => $request->agenda,
            'organization_id' => $request->organization
        ]);

        $meeting->attendees()->sync($request->attendees);

        return response()->json($meeting);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Meeting $meeting)
    {
        $meeting->delete();

        return response()->noContent();
    }
}

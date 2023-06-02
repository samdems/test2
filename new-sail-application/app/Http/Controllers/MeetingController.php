<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeetingRequest;
use App\Http\Requests\UpdateMeetingRequest;
use App\Models\Meeting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $jwt = JWTAuth::parseToken()->authenticate();
        $meetings = Meeting::with('attendees');

        if (!$request->has('all') || $jwt->admin !== 1) {
            $meetings->where('organization_id', $jwt->organization_id);
        }
        return response()->json($meetings->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreMeetingRequest $request)
    {
        $jwt = JWTAuth::parseToken()->authenticate();
        if ($jwt->admin === 1) {
            $organization = $request->organization ? $request->organization : $jwt->organization_id;
        } else {
            $organization = $jwt->organization_id;
        }
        $meeting = Meeting::create([
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'title' => $request->title,
            'agenda' => $request->agenda,
            'organization_id' => $organization
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
        $jwt = JWTAuth::parseToken()->authenticate();
        if ($jwt->admin !== 1 && $jwt->organization_id !== $meeting->organization_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $meeting->load(['attendees', 'organization']);

        $meeting->start_time = Carbon::parse($meeting->start_time)->format('H:i');
        $meeting->end_time = Carbon::parse($meeting->end_time)->format('H:i');

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
        $jwt = JWTAuth::parseToken()->authenticate();

        if ($jwt->admin !== 1 && $jwt->organization_id !== $meeting->organization_id) {
            return response()->JsonResponse(['error' => 'Unauthorized'], 401);
        }

        if ($jwt->admin === 1) {
            $organization = $request->organization ? $request->organization : $jwt->organization_id;
        } else {
            $organization = $jwt->organization_id;
        }
        $meeting->update([
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'title' => $request->title,
            'agenda' => $request->agenda,
            'organization_id' => $organization
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
        $jwt = JWTAuth::parseToken()->authenticate();
        if ($jwt->admin !== 1 && $jwt->organization_id === $meeting->$jwt->organization_id) {
            return response()->JsonResponse(['error' => 'Unauthorized'], 401);
        }

        $meeting->delete();

        return response()->noContent();

    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function index()
    {
        $organizations = Organization::all();
        return response()->json($organizations);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:organizations|max:255',
        ]);

        $organization = Organization::create($validatedData);

        return response()->json($organization, 201);
    }

    public function show(Organization $organization)
    {
        return response()->json($organization);
    }

    public function update(Request $request, Organization $organization)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:organizations|max:255',
        ]);

        $organization->update($validatedData);

        return response()->json($organization);
    }

    public function destroy(Organization $organization)
    {
        $organization->delete();
        return response()->noContent();
    }
}

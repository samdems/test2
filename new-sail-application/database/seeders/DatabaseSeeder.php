<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Organization::factory(10)->create();
        \App\Models\Meeting::factory(10)->create();

        \App\Models\User::factory(10)->create();


        
        \App\Models\Meeting::factory()->create([
            'organization_id' => 1
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Test admin',
            'email' => 'admin@localhost',
            'admin' => true,
            'organization_id' => 1
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@localhost',
            'organization_id' => 1
        ]);
    }
}

<?php

namespace Database\Factories;

use App\Models\Meeting;
use App\Models\User;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meeting>
 */
class MeetingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Meeting::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $organization = Organization::inRandomOrder()->first();
        $attendees = User::inRandomOrder()->limit(3)->pluck('id')->toArray();

        return [
            'date' => $this->faker->date(),
            'start_time' => $this->faker->time(),
            'end_time' => $this->faker->time(),
            'title' => $this->faker->sentence(),
            'agenda' => $this->faker->paragraph(),
            'organization_id' => $organization->id,
        ];
    }
}

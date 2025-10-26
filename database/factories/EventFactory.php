<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'website' => fake()->domainName(),
            'organizer_contact' => sprintf(
                '+9665%s%s',
                fake()->randomElement([5, 0, 3, 6, 4, 9, 1, 8, 7]),
                fake()->unique()->randomNumber(7)
            ),
            'description' => fake()->text(),
            'lat' => fake()->latitude(),
            'lng' => fake()->longitude(),
            'city' => fake()->city(),
            'street' => fake()->streetAddress(),
            'district' => fake()->streetAddress(),
            'full_address' => fake()->address(),
        ];
    }
}

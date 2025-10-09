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
        $this->command->call('media-library:clean');

        $this->call(SettingsSeeder::class);

        $this->command->line('Admin Credentials:');
        $this->command->table(['Email', 'Password'], [
            ['admin@demo.com', 'password'],
        ]);
    }
}

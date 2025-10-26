<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('website')->nullable();
            $table->string('organizer_contact')->nullable();
            $table->text('description');
            $table->decimal('lat', 10, 8);
            $table->decimal('lng', 11, 8);
            $table->string('city')->nullable();
            $table->string('street')->nullable();
            $table->string('district')->nullable();
            $table->text('full_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};

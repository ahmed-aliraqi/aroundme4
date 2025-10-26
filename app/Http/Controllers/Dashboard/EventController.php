<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\EventRequest;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $events = Event::filter()->latest()->paginate()->appends(request()->query());

        return inertia('Dashboard/Events/Index', compact('events'));
    }

    public function store(EventRequest $request): RedirectResponse
    {

        Event::create($request->allWithHashedPassword());

        return to_route('dashboard.events.index')->with([
            'message' => __('events.messages.created'),
        ]);
    }

    public function update(EventRequest $request, Event $event): RedirectResponse
    {
        $event->update($request->validated());

        return to_route('dashboard.events.index')->with([
            'message' => __('events.messages.updated'),
        ]);
    }

    public function destroy(Event $event): RedirectResponse
    {
        if ($event->is(auth()->event())) {
            return back()->with([
                'status' => 'error',
                'message' => __('events.messages.cannot-delete'),
            ]);
        }

        $event->delete();

        return back()->with([
            'message' => __('events.messages.deleted'),
        ]);
    }

    public function deleteSelected(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:events,id',
        ]);

        $ids = $request->input('ids');

        if (in_array(auth()->id(), $ids)) {
            $ids = Arr::except($ids, auth()->id());
        }

        Event::destroy($ids);

        return back();
    }
}

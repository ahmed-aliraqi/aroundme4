<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Support\GeoSearch;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Uri;

/**
 * @group Maps
 */
class MapController extends Controller
{
    /**
     * Style
     *
     * The style of the maplibre SDK
     *
     * @responseFile status=200 scenario="Response 200" storage/docs/responses/maps/style.json
     */
    public function style(): JsonResponse
    {
        $url = Uri::of(config('services.maps.style'));

        if (\request('style') === 'dark') {
            $url = $url->withQuery(['style' => 'dark']);
        }

        $response = Http::get($url);

        $style = $response->json();

        return response()->json($style);
    }

    /**
     * Search
     *
     * @queryParam string q required Example: traffic
     *
     * @responseFile status=200 scenario="Response 200" storage/docs/responses/maps/search.json
     */
    public function searchForMap(Request $request): JsonResponse
    {
        $queryParameters = [
            'q' => $request->get('q'),
            'lang' => app()->getLocale(),
        ];

        if ($request->has(['lat', 'lng'])) {
            $queryParameters['lat'] = $request->get('lat');
            $queryParameters['lng'] = $request->get('lng');
        }

        $response = Http::acceptJson()
            ->withQueryParameters($queryParameters)
            ->get('https://search.thtc.sa/api/pois/search');

        return response()->json($response->json());
    }

    /**
     * Reverse Geocoding
     *
     * Used to get city, district and street name from coordinates.
     *
     * @queryParam query string required Latitude and longitude separated by a comma. Example: "26.328080792214777,50.14283269643784"
     *
     * @responseFile status=200 scenario="Response 200" storage/docs/responses/maps/search.json
     */
    public function geoSearch(): JsonResponse
    {
        $response = Http::get(config('services.maps.geo_search'), [
            'key' => config('services.maps.key'),
            'lang' => app()->getLocale(),
            'query' => request('query'),
            'type' => 'reverse',
        ]);

        return response()->json($response->json());
    }

    /**
     * Get Address
     *
     * Used to get city, district and street name from coordinates.
     *
     * @responseFile status=200 scenario="Response 200" storage/docs/responses/maps/search.json
     */
    public function getAddress(Request $request): JsonResponse
    {

        if ($request->lang) {
            app()->setLocale($request->lang);
        }

        $request->validate([
            'lat' => ['required', 'numeric', 'between:-90,90'],
            'lng' => ['required', 'numeric', 'between:-180,180'],
        ], [], __('reports.attributes'));

        $geoSearch = GeoSearch::make(
            latitude: $request->lat,
            longitude: $request->lng,
        );

        $data = $request->only(['lat', 'lng']);

        $data['city'] = $geoSearch->getCity();
        $data['street'] = $geoSearch->getStreet();
        $data['district'] = $geoSearch->getDistrict();
        $data['full_address'] = $geoSearch->getFullAddress();

        return response()->json($data);
    }

    /**
     * Al-Khobar Cameras
     *
     * Retrieve cameras location of Al-Khobar city.
     *
     * @responseFile status=200 scenario="Response 200" storage/docs/responses/maps/cams.json
     */
    public function geojson(): \Illuminate\Http\Response
    {
        $content = file_get_contents(storage_path('geojson/khobar-cams.geojson'));

        return response($content)->header('Content-Type', 'application/json');
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class LocaleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->wantsJson()) {
            app()->setLocale(
                $locale = Session::get(
                    'locale',
                    $request->get('language', app()->getLocale())
                )
            );

            if (user() && user()->language != $locale) {
                user()->forceFill(['language' => $locale])->saveQuietly();
            }

            if (user('sanctum') && user('sanctum')->language != $locale) {
                user('sanctum')->forceFill(['language' => $locale])->saveQuietly();
            }

            return $next($request);
        }

        if ($locale = $request->header('x-accept-language', $request->get('language', app()->getLocale()))) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}

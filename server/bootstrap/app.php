<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            'api/v1/register',
            'api/v1/login',

            'api/v1/subscribe',

            'api/v1/user',
            'api/v1/user/*',

            'api/v1/blog/*',
            'api/v1/blog/all',

            'api/v1/user/blog/*',
            'api/v1/user/blog/all/*',
            'api/v1/user/blog/store',
            'api/v1/user/blog/update/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

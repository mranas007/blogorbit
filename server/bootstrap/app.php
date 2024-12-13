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
            'api/v1/user',
            'api/v1/user/{id}',
            'api/v1/register',
            'api/v1/login',
            'api/v1/blog',
            'blog/user',
            'blogs/user/{id}',
            'blog/user/{id}',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

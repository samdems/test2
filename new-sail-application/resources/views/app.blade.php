<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    <body>
        <div id="app">
            <app-nav></app-nav>
            <div class="container">
                <error></error>
                <router-view></router-view>
            </div>
        </div>
        @vite('resources/js/app.js') 
    </body>
</html>

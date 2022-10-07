<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Film
            @if($distributeur)
            <a href="{{route('films')}}">
                Not Distributeur
            </a>
            @else
            <a href="{{route('films',['distributeur'=>1])}}">
                With Distributeur
            </a>
            @endif
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <!--
                    <form method="POST" action="{{route('postMessage')}}">
                        <input type="text" name="message" />
                        @csrf
                        <input type="submit" />
                    </form>
                    <b>Messages</b></br>
-->
                    <ul>
                        @foreach ($films as $film)
                        <li>
                            <a href="{{route('showFilm',$film->id_film)}}">
                                {{$film->titre}}
                            </a>
                        </li>
                        </br>
                        @endforeach
                    </ul>
                    {{$films->links()}}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

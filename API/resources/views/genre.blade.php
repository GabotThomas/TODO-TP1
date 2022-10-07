<x-app-layout>
    <x-slot name="header">
        <a href="{{url()->previous()}}">
            <- Retour</a>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    {{$genre->nom}}
                </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <ul>
                        @foreach ($films as $film)
                        <li>
                            <a href="{{route('showFilm',$film->id_film)}}">
                                {{$film->titre}}
                            </a>
                        </li>
                        @endforeach
                    </ul>
                    {{$films->links()}}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

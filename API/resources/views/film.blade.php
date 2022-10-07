<x-app-layout>
    <x-slot name="header">
        <a href="{{url()->previous()}}">
            <- Retour</a>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    {{$film->titre}}
                </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <p>
                        Résumé: {{$film->resum ?? ''}}
                        </br>
                        </br>
                        Genre:
                        @if (!empty($film->genre))
                        <a href="{{route('genre',$film->genre->id_genre)}}">
                            {{$film->genre->nom}}
                        </a>
                        @endif
                        </br>
                        Distributeur:
                        @if (!empty($film->distributeur))
                        <a href="{{route('distributeur',$film->distributeur->id_distributeur)}}">
                            {{$film->distributeur->nom }}
                        </a>
                        @endif
                        </br>
                        Date Début: {{$film->date_debut_affiche}}
                        </br>
                        Date Fin: {{$film->date_fin_affiche}}
                        </br>
                        Durée: {{$film->duree_minutes}} minutes

                    </p>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

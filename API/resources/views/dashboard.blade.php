<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    Wall ! </br>
                    <form method="POST" action="{{route('postMessage')}}">
                        <input type="text" name="message" />
                        @csrf
                        <input type="submit" />
                    </form>
                    <b>Messages</b></br>
                    <ul>
                        @foreach ($messages as $message)
                        <li>{{$message->message}}
                            @if ($user_id == $message->user_id)
                            <a href="{{route('deleteMessage',$message->id)}}"><i> delete</i></a>
                            <a href="{{route('updateMessage',$message->id)}}"><i> update</i></a>
                            @endif
                        </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

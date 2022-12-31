Celem projektu jest napisanie w React aplikacji podobnej do timer'a meta event'ów w grze GW2
https://wiki.guildwars2.com/wiki/Event_timers

Etap 1:
- dane zawierające podstawowe informacje o event'ach będą się znajdować w oddzialnym pliku i będą wstrzykiwane do aplikacji jako Promise (w celu prostej symulacji BE). Aplikacja ma też mieć możliwość symulowania opóźnienia na pobraniu danych, prezentacji stanu loader'a oraz obsługę błędu pobierania.
- event'y będą ułożone w tabeli od najbliższego do najdalszego (wraz z informacją ile czasu pozostało do każdego z nich)
- obecnie aktywny event będzie oznaczony kolorem
- aplikacja ma wspierać RWD
- aplikacja ma być napisana przy użyciu dostępnego od wersji 16.8 zapisu funkcyjnego i hook'ów

Etap 2:
- aplikacja będzie zawierała dodatkową stronę "adminowską" dającą możliwość edycji, dodawania i usuwania event'ów
- zmiany w eventach będą zapisywane w session storage. W przypadku wyczyszczenia session storage dane wrócą do oryginalnej formy z pliku

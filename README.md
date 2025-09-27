# Zegar – losowa godzina

Prosty projekt: okrągły zegar (analogowy + mała reprezentacja cyfrowa) z losowaną godziną.

## Struktura

- `index.html` – struktura strony
- `style.css` – stylizacja i layout
- `script.js` – logika losowania oraz ustawianie wskazówek

## Działanie

1. Po otwarciu strony na środku ekranu widoczny jest zegar o średnicy równej połowie wysokości okna (z ograniczeniem do szerokości ekranu dla mniejszych urządzeń).
2. Przy pierwszym załadowaniu generowana jest losowa godzina (format 12h: 00–11 dla godzin, minuty 00–59).
3. Kliknięcie przycisku "Losuj" powoduje wylosowanie nowej godziny.
4. Można wybrać krok minut: 1, 5 lub 15.

## Jak uruchomić

Po prostu otwórz plik `index.html` w przeglądarce (dwuklik lub przeciągnięcie do okna przeglądarki).

Możesz też uruchomić prosty serwer (np. Python):

```bash
python3 -m http.server 8000
```

Następnie odwiedź: <http://localhost:8000>

## Pomysły na rozwinięcie

- Dodanie sekundnika
- Tryb 24h
- Zgadnij godzinę (quiz: użytkownik wpisuje odpowiedź)
- Animowana zmiana między wylosowanymi godzinami

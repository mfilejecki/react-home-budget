# Home Budget Tracker App - React + TypeScript + Vite + Tailwind

## Kontekst

Tworzona aplikacja to **Home Budget Tracker** do zarządzania domowym budżetem. Celem projektu jest umożliwienie użytkownikowi:

- Dodawania, edytowania i usuwania transakcji (wydatków/przychodów).
- Przeglądania historii transakcji.
- Filtrowania transakcji według kategorii.
- Wizualizacji wydatków (np. wykresy).

Aplikacja będzie używana do badań porównawczych w pracy magisterskiej nad frameworkami front-endowymi.

## Stack technologiczny

- **React** (z szablonem **TypeScript**) - biblioteka UI.
- **Redux Toolkit** - zarządzanie stanem aplikacji.
- **Tailwind CSS** - stylowanie komponentów.
- **Vite** - narzędzie do budowy projektu.
- **Chart.js lub Recharts** (opcjonalnie) - wizualizacja danych.

## Wymagania funkcjonalne

### 1. Transakcje

- Dodawanie nowej transakcji:

  - Tytuł (string)
  - Kwota (number)
  - Kategoria (string)
  - Data (string lub obiekt `Date` w formacie ISO)

- Edytowanie istniejącej transakcji
- Usuwanie transakcji

### 2. Historia

- Lista wszystkich transakcji
- Filtracja transakcji wg kategorii
- Sortowanie po dacie

### 3. Wizualizacja

- Wyświetlanie sumy wydatków i przychodów
- Wyświetlanie wykresu wydatków według kategorii

## Wymagania niefunkcjonalne

- Responsywność (działanie również na telefonach)
- Dobre praktyki TypeScript
- Czytelna struktura kodu
- Zarządzanie stanem przy użyciu Redux Toolkit
- Stosowanie Tailwind CSS do stylowania (bez plików SCSS/CSS oprócz `index.css`)
- Czytelna i spójna struktura projektu

## Struktura katalogów

```
src/
├── assets/
├── components/
│   ├── TransactionList/
│   ├── TransactionItem/
│   ├── TransactionForm/
│   ├── Filter/
│   └── Chart/
├── pages/
│   ├── Home.tsx
│   ├── AddTransaction.tsx
│   └── EditTransaction.tsx
├── redux/
│   ├── store.ts
│   └── transactionsSlice.ts
├── services/
│   └── transactionsService.ts (opcjonalnie na późniejsze API)
├── utils/
│   ├── formatDate.ts
│   └── formatCurrency.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Główne technologie i ich zastosowanie

- **Vite** - szybkie tworzenie projektu i jego budowanie.
- **TypeScript** - typowanie propsów, akcji w Redux i ogólna poprawa czytelności kodu.
- **Tailwind CSS** - szybkie i responsywne tworzenie UI.
- **Redux Toolkit** - przechowywanie stanu transakcji.
- **React Router** (opcjonalnie) - obsługa wielu stron (Home, Dodaj, Edytuj).

## Co musi zostać przygotowane

- Konfiguracja Tailwind CSS
- Konfiguracja Redux Store
- Typy danych dla transakcji
- Komponenty: formularze, lista transakcji, filtr, wykres
- Podstawowe strony: Home, Dodaj transakcję, Edytuj transakcję
- Routing pomiędzy stronami
- Implementacja dodawania, edytowania i usuwania transakcji przez Redux
- Stylowanie Tailwind CSS

## Używane biblioteki (propozycja)

```bash
npm install react-redux @reduxjs/toolkit react-router-dom
```

(Opcjonalnie do wykresów)

```bash
npm install recharts
```

## Development scripts

```bash
npm run dev       # uruchamia projekt
npm run build     # buduje projekt do produkcji
npm run preview   # podgląd wersji produkcyjnej
```

---

# Notatki dla Copilota

- Framework: **React** (z **TypeScript**)
- Stylowanie: **Tailwind CSS**
- Stan aplikacji: **Redux Toolkit**
- Wszystkie komponenty mają być typowane
- Własne hooki i pomocnicze funkcje mile widziane
- Kod ma być przejrzysty, rozdzielony na małe komponenty
- Typowanie akcji w Redux wymagane
- Wszędzie stosować importy modułowe (nie pojedyncze importy ze src)

# Cel końcowy

Gotowa aplikacja do zarządzania budżetem domowym, która posłuży jako benchmark do badań nad wydajnością i ergonomią użycia frameworków JavaScript w pracy magisterskiej.

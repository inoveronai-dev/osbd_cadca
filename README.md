# OSBD Čadca — webová stránka

Prvá dizajnová implementácia webovej stránky pre **OSBD Čadca** (Okresné stavebné bytové družstvo so sídlom v Čadci) — správu bytových domov v regióne Kysúc.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (Button, Sheet)

## Spustenie

```bash
npm install
npm run dev -- --port 43123
```

Otvorte [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Štruktúra

- `app/` — layout a homepage
- `components/layout/` — hlavička, pätička, logo
- `components/sections/` — sekcie homepage
- `components/media/` — image placeholder sloty
- `lib/content/` — overený obsah (SK), bez vymyslených údajov
- `lib/navigation.ts` — navigácia s `pending` cieľmi
- `public/images/*.OPEN.txt` — sloty na autentické fotografie

## Otvorené položky

- Finálne logo OSBD
- Hero fotografia Čadca / Kysuce
- Fotografia sídla / zamestnancov
- Fotografia zrekonštruovaného domu
- Stránkové hodiny (zatiaľ bez konkrétnych časov)
- Podstránky: Pre vlastníkov, Dokumenty, detail O nás, všetky oznamy

## Dizajn tokeny

Farby sú v CSS premenných v `app/globals.css` (`--forest`, `--green`, `--sage`, `--paper`, `--ink`) — ľahko upraviteľné po dodaní finálneho loga.

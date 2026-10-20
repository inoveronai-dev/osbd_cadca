# OSBD Čadca — webová stránka

Webová stránka pre **OSBD Čadca** (Okresné stavebné bytové družstvo so sídlom v Čadci) so zabudovaným admin CMS (GitHub-backed).

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Zod + GitHub Contents/Git Data API (CMS)
- jose + bcryptjs (admin auth)

## Spustenie (verejný web)

```bash
npm install
npm run dev -- --port 43123
```

Otvorte [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Obsah

Verejný obsah je v `/content/*.json` a je súčasťou buildu (žiadne GitHub volania pre návštevníkov).

Štruktúra:

- `content/site.json` — brand, kontakty org, mapa, havarijná CTA
- `content/homepage.json` — úvodná stránka
- `content/aktuality.json` — aktuality (`active` filter na webe)
- `content/kontakty.json` — hodiny, kontakty družstva, poruchy
- `content/organy.json`, `historia.json`, `stanovy.json`, …
- `public/uploads/` — nové PDF/obrázky po uložení cez admin

Existujúce PDF na `osbdcadca.sk` zostávajú externe, kým ich klient nenahradí v admin.

## Admin CMS

- URL: `/admin` (login `/admin/login`)
- Auth: jeden účet cez `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` + `SESSION_SECRET`
- Uloženie: protected API → GitHub commit (allowlist `content/` + `public/uploads/`) → Vercel redeploy
- Uloženie adminu: `GITHUB_BRANCH=main` (živý web)

Skopírujte `.env.example` → `.env.local` a doplňte hodnoty.

Generovanie hash hesla:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 12))"
```

Lokálny test účet (iba `.env.local`, nie commitovať):  
`admin@osbdcadca.local` / `osbd-admin-local`

## Navigácia

Hlavná navigácia ostáva developer-owned v `lib/navigation.ts` (nie v CMS).

## Dôležité

- Klient edituje obsah, nie dizajn
- Admin číta najnovší stav z GitHub API
- Verejný web používa JSON z deployovaného repa
- SHA conflict protection pri súbežných úpravách

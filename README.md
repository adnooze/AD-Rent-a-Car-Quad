# AD Rent a Car & Quad Zenica

Web stranica za [@rent_a_car_ad_zenica](https://www.instagram.com/rent_a_car_ad_zenica/), napravljena u [Astro](https://astro.build).

## Lokalno

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # izlaz u dist/
```

## Cloudflare Pages

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Node verzija dolazi iz `.nvmrc`

## Struktura

- `src/pages/index.astro` – početna stranica
- `src/data/site.js` – kontakt podaci i lista vozila
- `src/components/` – header, footer, ikone
- `src/styles/global.css` – stilovi
- `src/scripts/main.js` – meni, animacije, forma za WhatsApp upit
- `public/assets/img/` – slike sa Instagrama

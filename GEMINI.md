# SmileCraft Dental — Project Context

## Project
- **Type:** Static demo website (pure HTML/CSS/JS — no Firebase, no backend)
- **Client:** Sri Sai Dental Clinic (demo name: SmileCraft Dental)
- **Location:** `C:\Users\Panchakshari S H\Downloads\website demos\dental website\`
- **GitHub:** sri-sai-dental-clinic

## File Structure
```
dental website/
├── index.html       # All sections (single page)
├── index.css        # Design system: CSS variables, reset, animations, loader
├── components.css   # Navbar, hero, marquee
├── sections.css     # All section styles + responsive
├── script.js        # Scroll animations, counters, carousel, nav toggle
├── frames/          # Scroll-frame images for the 3D teeth animation section
└── images/
    ├── dentist-1.png
    └── dentist-2.png
```

## Design System
- **Fonts:** `Playfair Display` (headings), `DM Sans` (body) — loaded from Google Fonts
- **Primary accent:** `#1a5fff` (blue)
- **Secondary accent:** `#00b4d8` (cyan)
- **Background:** `#f5f8ff` (light mode only)
- **Gradient:** `linear-gradient(135deg, #1a5fff 0%, #00b4d8 100%)`
- **Highlight text:** gradient clipped via `-webkit-background-clip: text`
- **Animations:** `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` — IntersectionObserver-driven

## Page Sections (in order)
1. **Loader** — tooth emoji + progress bar
2. **Navbar** — logo, links, hamburger menu
3. **Hero** — headline, stats counter (15000 patients, 12yr, 25 doctors), animated orbs
4. **Marquee** — scrolling service list
5. **Services** — 6 cards (Cosmetic, Implants, Whitening, Root Canal, Orthodontics, Pediatric)
6. **3D Teeth Scroll** — `#teeth3d` canvas section with frame-by-frame scroll animation + 3 text overlays + CTA
7. **About** — image + features list
8. **Stats Bar** — 4 counters
9. **Team** — 3 doctor cards (Dr. Rajesh Kumar, Dr. Priya Sharma, Dr. Arun Nair)
10. **Testimonials** — slider with 3 reviews
11. **Gallery** — 3 before/after cards
12. **Contact** — info + appointment form (Name, Phone, Email, Date, Service, Message)
13. **Footer** — brand, quick links, services, contact

## Key Details
- No Firebase. No build step. Open `index.html` directly in browser.
- The `frames/` folder holds images for the scroll-animation canvas sequence.
- Counter animation: `.counter` elements with `data-target` attr, driven by `script.js`.
- All CSS vars defined in `:root` inside `index.css` — edit there for global theme changes.
- Icons: Font Awesome 6.5.1 via CDN.

## Do Not
- Add Firebase unless explicitly asked.
- Add a build system / bundler unless explicitly asked.
- Change the font stack without asking.

---
description: How to run and extend the SmileCraft Dental website
---

# SmileCraft Dental Website Workflow

## Running the Website
// turbo-all

1. Open `index.html` in a browser:
```powershell
start "c:\Users\Panchakshari S H\Downloads\dental website\index.html"
```

## Project Structure

```
dental website/
├── index.html        # Main HTML page (all sections)
├── index.css         # Design system (variables, reset, animations)
├── components.css    # Navbar, hero, marquee styles
├── sections.css      # All section styles + responsive
├── script.js         # Animations, counters, carousel, nav
└── images/
    ├── dentist-1.png # Male dentist photo
    └── dentist-2.png # Female dentist photo
```

## Adding 3D Teeth Scroll Animation

1. Find the `<section class="teeth-3d-section" id="teeth3d">` in `index.html`
2. Replace the placeholder content inside `.teeth-3d-container` with your canvas/frames
3. Add your scroll-frame JS logic in `script.js`

## Customization

- **Colors**: Edit CSS variables in `:root` block of `index.css`
- **Clinic Name**: Search and replace "SmileCraft" in `index.html`
- **Contact Info**: Update address, phone, email in the Contact section and footer
- **Doctor Photos**: Replace `images/dentist-1.png` and `dentist-2.png`
- **Services**: Edit the service cards in the Services section

## Deploying

1. Upload all files to any static hosting (Netlify, Vercel, cPanel)
2. No build step needed — pure HTML/CSS/JS

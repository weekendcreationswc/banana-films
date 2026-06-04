# Weekend Creations — Premium Agency Website

A gorgeous, highly customized, responsive, color-graded web template for **Weekend Creations** (Advertising & Digital Marketing Company). Built with vanilla HTML5, CSS3, and dynamic JavaScript interactions.

## 🚀 Key Features

- **Tagline Focus:** Prominently spotlights your tagline: `CREATE` • `CAPTIVATE` • `CONVERT`.
- **Cosmic Glow Aesthetics:** Floating ambient gradient lights that transition dynamically as you interact.
- **Micro-Animations & 3D Tilt:** Smooth, interactive parallax 3D cards in the hero section and reactive cursor glow bubbles.
- **WhatsApp Integration:** Interactive lead generation brief builder in the contact section that automatically creates a custom formatted message and redirects prospects directly to your WhatsApp (`9446777095`).
- **Fully Responsive:** Sleek experience on mobile, tablet, and desktop viewports.

---

## 📂 Project Structure

```text
weekend-creations/
├── index.html                   # Main semantic web layout structure
├── style.css                    # Visual system, custom animations, custom scrollbars, and dark mode layout
├── app.js                       # Interactive cursor, 3D card tilt, navigation triggers, and WhatsApp API connector
├── CNAME                        # Domain routing config for custom domain
├── README.md                    # Project documentation (this file)
└── assets/
    └── marketing_hero.png       # Custom generated abstract 3D growth illustration
```

---

## 💻 Local Preview & Testing

1. **Direct Open:**
   Simply double-click the `index.html` file to open it in your browser of choice.

2. **Using local server (Recommended for correct asset paths):**
   Open your terminal, navigate to the folder, and run:
   ```bash
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your web browser.

---

## 🌍 Domain Deployment (weekendcreations.in)

### Option 1: GitHub Pages (Free Hosting)
1. Push this folder to a GitHub repository.
2. In repository **Settings** -> **Pages**, configure deployment from the `main` branch.
3. Add `weekendcreations.in` under the Custom Domain field.
4. Point your domain DNS records to GitHub's IPs:
   - **A Records:** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME Record:** `www` pointing to `YOUR_USERNAME.github.io`

### Option 2: Hostinger, cPanel, or Custom Hosting
1. Take the prepared `weekend-creations-dist.zip` package.
2. Upload it to the `public_html` directory of your web host via the hosting File Manager.
3. Extract (Unzip) the folder's files directly in `public_html`.

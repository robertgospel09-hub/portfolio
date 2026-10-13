# Gospel Robert — Portfolio.

Static site. No build step. Plain HTML, CSS and a little JS.

## Pages
| URL | File |
|---|---|
| `/` | `index.html` (landing) |
| `/work/` | `work/index.html` |
| `/about/` | `about/index.html` |
| `/experience/` | `experience/index.html` |
| `/contact/` | `contact/index.html` |
| `/work/homebridge/`, `/work/creatororbit/`, `/work/ahz-associates/`, `/work/avero/` | case studies |

## Deploy on Vercel
**Option A, drag and drop:** go to vercel.com/new, choose "Deploy" from a folder, drop this whole folder. Framework preset: **Other**. No build command.

**Option B, GitHub (auto-redeploys on every push):** push this folder to a GitHub repo, then in Vercel click "Add New → Project", import the repo, preset **Other**, deploy.

## Swapping in images
All images live in `assets/`.

- **Your photo:** replace `assets/gospel.jpg` (keep the name). Used in the hero and About page.
- **Project thumbnails:** `assets/homebridge.jpg` and `assets/creatororbit.jpg`.
- **AHZ and Avero thumbnails (currently "ADD IMAGE"):** add e.g. `assets/avero.jpg`, then in `work/index.html` find the Avero block and replace
  `<a href="/work/avero/" class="shot empty reveal" ...><span class="ph-text">Add image</span></a>`
  with
  `<a href="/work/avero/" class="shot reveal"><img src="/assets/avero.jpg" alt="Avero preview"></a>`
- **Case study phase images:** in each `work/<project>/index.html`, replace a placeholder
  `<div class="shot empty reveal">…</div>` with
  `<div class="shot reveal"><img src="/assets/avero-phase-1.jpg" alt="…"></div>`

Images look best at roughly a 3:2 ratio, around 1600px wide.

## Still to fill in
- Social links point to your Behance, Dribbble and LinkedIn profiles.
- The contact form sends messages straight to robertgospel09@gmail.com via FormSubmit (free, no account).
  The FIRST message triggers an activation email from FormSubmit: click "Activate Form" once and every message after that lands in your inbox.

## Testimonials
The Testimonials page is built but hidden until it has real quotes. Add them to TESTIMONIALS in the build script,
or send them over and they'll be added. The page and its nav link appear automatically once there's at least one.

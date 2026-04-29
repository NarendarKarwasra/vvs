# Vijay Vikram Singh Website

A static multi-page personal brand website for `www.vijayvikramsingh.com` with:

- Home page: `index.html`
- About page: `about.html`
- Corporate training page: `training.html`
- Speaker page: `speaker.html`
- Voice-over page: `voice-over.html`
- Actor page: `Actor.html`
- Media page: `media.html`
- Contact page with expanded lead form: `contact.html`
- WhatsApp assistant widget on all pages
- Optional Vercel serverless lead endpoint: `api/lead.js`

## 1. Files and folders

```text
vvs-website/
  index.html
  about.html
  training.html
  speaker.html
  voice-over.html
  Actor.html
  actor.html                 # redirect helper to Actor.html
  media.html
  contact.html
  assets/
    css/styles.css
    js/main.js
    images/
      logo-vvs.svg
      hero-vijay.webp
      journey-vijay.webp
      original-presenting.webp
      original-formal.webp
  api/
    lead.js                  # optional WhatsApp Cloud API notification endpoint
  package.json
  vercel.json
  robots.txt
  sitemap.xml
```

## 2. Important changes before launch

Open `assets/js/main.js` and replace this placeholder:

```js
whatsappNumber: "919876543210"
```

Use the real WhatsApp number with country code and no plus sign. Example:

```js
whatsappNumber: "919812345678"
```

Also replace placeholder contact details in:

- `contact.html`
- Footer blocks inside all HTML files
- `sitemap.xml` only if the final domain changes

## 3. How the WhatsApp feature works

The site has two WhatsApp layers:

### A. Front-end WhatsApp assistant

This works immediately on Vercel, GitHub Pages, or any static host. It opens WhatsApp with a pre-filled enquiry message.

Files involved:

- `assets/js/main.js`
- floating widget HTML in the footer section of each page
- contact lead form in `contact.html`

### B. Optional Vercel API lead notification

`api/lead.js` can send lead details to a WhatsApp number through the Meta WhatsApp Cloud API.

Required Vercel environment variables:

```text
WHATSAPP_TOKEN=your_meta_cloud_api_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_NOTIFY_TO=recipient_number_with_country_code
```

Important: WhatsApp Cloud API rules may require approved templates or an active 24-hour conversation window. The front-end WhatsApp click-to-chat flow is included as a reliable fallback.

## 4. Run locally

### Option 1: Simple local preview

Open `index.html` in your browser.

### Option 2: Use a local server

```bash
python3 -m http.server 3000
```

Then open:

```text
http://localhost:3000
```

### Option 3: Vercel local dev

Install Vercel CLI:

```bash
npm i -g vercel
```

Run:

```bash
vercel dev
```

## 5. Push to GitHub

1. Create a new GitHub repository, for example:
   - `vijay-vikram-singh-website`

2. Unzip this folder and open Terminal inside the folder.

3. Run:

```bash
git init
git add .
git commit -m "Initial Vijay Vikram Singh website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/vijay-vikram-singh-website.git
git push -u origin main
```

## 6. Deploy on Vercel using GitHub

1. Go to Vercel.
2. Click **Add New Project**.
3. Import the GitHub repository.
4. Vercel will detect this as a static site.
5. Keep default settings:
   - Framework Preset: Other
   - Build Command: leave blank
   - Output Directory: leave blank
6. Click **Deploy**.

## 7. Add the custom domain

1. In Vercel, open the project.
2. Go to **Settings > Domains**.
3. Add:
   - `vijayvikramsingh.com`
   - `www.vijayvikramsingh.com`
4. In your domain registrar DNS panel, add the records Vercel gives you.

Typical setup:

```text
A record: @ -> 76.76.21.21
CNAME: www -> cname.vercel-dns.com
```

Use the exact DNS values shown by Vercel if they differ.

## 8. Configure WhatsApp Cloud API on Vercel

In Vercel:

1. Open project.
2. Go to **Settings > Environment Variables**.
3. Add:

```text
WHATSAPP_TOKEN
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_NOTIFY_TO
```

4. Redeploy the project.

## 9. Recommended next improvements

- Replace placeholder phone and email details with official details.
- Add real YouTube/showreel links in Media, Voice-Over and Actor pages.
- Replace placeholder testimonials with verified testimonials.
- Add approved client logos only after permission.
- Add analytics: Google Analytics, Meta Pixel and LinkedIn Insight Tag.
- Connect the form to a CRM such as HubSpot, Zoho, Google Sheets, or Airtable.

## 10. Notes for developer

- Navigation uses relative `.html` links so it works on Vercel and GitHub.
- `vercel.json` enables clean URLs and long cache headers for assets.
- `actor.html` redirects to `Actor.html` to prevent broken lowercase links.
- Contact form does not store leads by default. It opens WhatsApp and optionally calls `/api/lead`.

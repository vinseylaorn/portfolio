# Orn Vinseyla portfolio

Run npm ci and npm run dev, then open the local URL printed by Next.js.
Run npm run build to type-check and export the production website into out/.

Edit src/data.ts for contact details, skills and project information. Change the professional timeline in src/app/page.tsx. The downloadable PDF in public/ was composed from the supplied profile. The hero and About section use the portrait at public/images/profile.jpg. Add authentic project captures, repository links and demo URLs when available.

Set NEXT_PUBLIC_PROFILE_STATUS before building to display a confirmed status. The default is empty. For a custom domain, update NEXT_PUBLIC_SITE_URL, public/sitemap.xml and public/robots.txt.

The contact form validates required fields and email syntax, then opens the visitor's email app with a draft. The visitor sends the message there. To deliver directly, configure a server-side email provider, verify a sender domain and store its API key as a server secret. Connect the form to a server endpoint that validates input, rate-limits requests and reports the provider result. The current static export requires an external endpoint for this configuration.

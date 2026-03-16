# Themed Edits — Portfolio Website

A premium, modern full-stack portfolio website for **Hammad Ahmed** under the brand **Themed Edits**.

## 🚀 Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS** — utility-first styling
- **Framer Motion** — animations
- **React Router v6** — client-side routing
- **Firebase** (Firestore + Auth) — database & authentication
- **Cloudinary** — image hosting & optimization
- **React Hot Toast** — notifications

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, Layout
│   ├── sections/     # Hero, About, Skills, Projects, Services, Testimonials, CTA
│   └── ui/           # Reusable: ProjectCard, SkeletonCard, SectionHeader, PageLoader
├── pages/
│   ├── Home/         # Landing page with all sections
│   ├── Projects/     # All projects with search & filter
│   ├── ProjectDetail/# Individual project page
│   ├── About/        # About page with timeline
│   ├── Services/     # Services & pricing
│   ├── Contact/      # Contact form
│   ├── Login/        # Admin login
│   ├── Dashboard/    # Admin panel
│   └── NotFound/     # 404
├── hooks/
│   ├── useAuth.tsx   # Firebase auth context
│   ├── useProjects.ts# Firestore CRUD operations
│   └── useScrollReveal.ts
├── utils/
│   ├── firebase.ts   # Firebase config & init
│   └── cloudinary.ts # Cloudinary upload helper
└── styles/
    └── globals.css   # Global CSS, TailwindCSS directives, custom classes
```

---

## 🛠️ Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

The site runs at **http://localhost:5173**

### 3. Build for production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---


Features:
- Dashboard overview (total projects, featured, stats)
- Add new projects with images, tech stack, features
- Edit existing projects
- Delete projects (with confirmation)
- Cloudinary image uploads
- Firebase Firestore storage

---



## 📝 Adding Projects (Admin)

1. Go to `/login`
2. Sign in with admin credentials
3. Navigate to **Add Project**
4. Fill in: title, description, category, tech stack, features, URLs
5. Upload thumbnail + screenshots via Cloudinary
6. Toggle **Featured** for homepage display
7. Click **Add Project**

Projects appear instantly on the live site via Firebase real-time reads.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| `bg` | `#050508` |
| `surface` | `#0d0d14` |
| `accent` | `#6c63ff` |
| `accent-2` | `#ff6584` |
| `accent-3` | `#43e97b` |
| Font Display | Syne |
| Font Body | DM Sans |
| Font Mono | JetBrains Mono |

---

Built by **Hammad Ahmed** — Themed Edits

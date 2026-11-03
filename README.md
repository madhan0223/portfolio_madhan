# Premium Anime-Inspired AI, Machine Learning & Data Analytics Portfolio — Madhan S

A production-quality personal portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

The website combines two distinct visual worlds:
1. **Cinematic Anime Atmosphere**: Atmospheric elements inspired by *One Piece* (ocean & sunset energy), *Naruto* (moonlit blue aura, wind chakra swirls), *Black Clover* (grimoire magic vibes), and *Asta/Zoro* (emerald/violet energy & sword silhouette motifs).
2. **Futuristic AI Engineering Workspace**: An interactive cyberpunk laptop in the foreground with real-time neural network visualizations, Python code execution streams, dynamic data pipelines, and floating neon technology badges.

---

## 🌟 Key Features

- **Strict Source of Truth**: All information reflects Madhan S's verified resume (roles strictly: *Data Engineer | ML Engineer | Data Analyst*, Loyola Institute of Technology CGPA 8.0/10, 3 internships, 4 verified projects, 7 certifications).
- **Interactive AI Laptop (`AiLaptop.jsx`)**: Switch between 4 live screens:
  - **Neural AI Brain**: Pulsing synaptic neural node visualizer.
  - **Python IDE Terminal**: Live syntax-highlighted pandas/numpy/cv2 code.
  - **Data Pipeline DAG**: Visual workflow from Raw Data → Pandas ETL → ML Model → Insights.
  - **Analytics Telemetry**: Real-time simulated charts & distributions.
  - Floating 3D neon tags for Python, SQL, Machine Learning, Power BI, OpenCV, Data Engineering.
- **Changeable Resume Engine (`ResumeSettingsModal.jsx`)**:
  - Direct 1-click download of `Madhan_S_Resume.pdf` and in-tab preview.
  - Built-in **Resume Settings** modal: Upload a new PDF directly from your browser or link an external cloud URL (Google Drive, GitHub raw, etc.), which overrides the active resume instantly across the entire website without re-deploying.
  - One-click reset to default.
- **Anime Background Engine (`AnimeBackground.jsx`)**:
  - High-performance 60fps HTML5 Canvas with floating sakura petals and rising energy embers.
  - Subtle mouse parallax.
  - Automatic fallback for `prefers-reduced-motion` and low-power devices.
- **Featured Projects Gallery & Detail Modal**:
  - *Restaurant Data Analysis* (Live GitHub repo: `https://github.com/madhan0223/data-analysis-internship`)
  - *Nexa AI – Remote Work Assistant*
  - *AI Career Toolkit*
  - *Smart Intruder Alert System*
  - Click any card to launch the comprehensive project detail modal with feature breakdowns.
- **Verified Credentials & Timeline**:
  - Vertical internship timeline for Cognifyz IT Solutions, Shahnaz Bright Steel, and YBI Foundation.
  - 7 verified certifications (HackerRank, GUVI, IBM SkillsBuild, Power BI, TNATTI, Airobo Infinity).
- **Direct Connect Hub**:
  - Instant mailto link (`madhansridharmd@gmail.com`), phone (`+91 8248358213`), Chennai location, GitHub (`madhan0223`), and one-click copy email button.

---

## 🚀 Quick Start (Windows PowerShell)

### 1. Install Dependencies
```powershell
npm install
```

### 2. Start Local Development Server
```powershell
npm run dev
```
Open `http://localhost:3000` (or the port Vite provides) in your browser.

### 3. Build for Production
```powershell
npm run build
```
The compiled, optimized static assets will be created in the `dist/` directory.

### 4. Preview Production Build
```powershell
npm run preview
```

---

## ⚙️ How to Update or Change the Resume

### Method A: Through the Website UI (No coding required)
1. Click the **Gear icon (⚙️)** next to any Resume button (in the Navbar, Hero, or Contact section).
2. The **Resume Settings** modal will open.
3. Either:
   - **Upload PDF File**: Drag & drop or select your new resume PDF file. It will be loaded immediately for your session.
   - **External Cloud Link**: Paste a direct link (e.g. Google Drive view/download link or GitHub raw URL).
4. Test with the **Preview** or **Download** buttons inside the modal.

### Method B: By replacing the source PDF file (Permanent)
1. Replace `public/Madhan_S_Resume.pdf` with your new PDF file (keep the filename `Madhan_S_Resume.pdf`).
2. Run `npm run build` and redeploy.

---

## ✏️ How to Customize Personal Details

All profile information is centralized in single data files:

- **Personal Info & Bio**: [`src/data/profile.js`](src/data/profile.js)
  - Change email, phone, location, LinkedIn link, or bio text.
- **Technical Skills**: [`src/data/skills.js`](src/data/skills.js)
  - Add or update skills in Data Engineering, Machine Learning, and Data Analytics.
- **Projects**: [`src/data/projects.js`](src/data/projects.js)
  - Update GitHub URLs, live demo links, or add new projects.
- **Experience & Education**: [`src/data/experience.js`](src/data/experience.js)
- **Certifications**: [`src/data/certifications.js`](src/data/certifications.js)

---

## 🌐 Free Deployment on Vercel

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push this project to your GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of Madhan S portfolio"
   git branch -M main
   git remote add origin https://github.com/madhan0223/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New** → **Project**.
4. Select your `portfolio` repository.
5. Vercel automatically detects **Vite**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**. Your portfolio will be live with a free SSL certificate!

### Option 2: Using Vercel CLI
```powershell
npm i -g vercel
vercel
```
Follow the interactive prompts to deploy in seconds.

---

## 📁 Project Structure

```
portfolio/
├── index.html                      # HTML root with Orbitron, Plus Jakarta Sans, Fira Code
├── package.json
├── tailwind.config.js              # Anime & futuristic neon color themes
├── vite.config.js
├── public/
│   └── Madhan_S_Resume.pdf         # Verified official resume PDF
├── scripts/
│   └── generate_resume_pdf.js      # Utility script to generate resume PDF
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                   # Glassmorphism utilities & keyframes
    ├── context/
    │   └── ResumeContext.jsx       # State management for dynamic changeable resume
    ├── data/
    │   ├── profile.js              # Central source of truth for Madhan S
    │   ├── skills.js               # Resume-supported skills by category
    │   ├── projects.js             # 4 verified projects with GitHub links & features
    │   ├── experience.js           # 3 internships & educational milestones
    │   └── certifications.js       # 7 verified certifications
    └── components/
        ├── AnimeBackground.jsx      # HTML5 Canvas sakura petals & celestial energy sparks
        ├── Navbar.jsx               # Glassmorphism navbar with scrollspy & mobile drawer
        ├── Hero.jsx                 # Cinematic hero with exact 3 titles & 4 stat cards
        ├── AiLaptop.jsx             # Interactive 3D laptop with 4 live screens & floating badges
        ├── About.jsx                # Academics, CGPA 8.0, and technical biography
        ├── Skills.jsx               # 3 tracks: Data Engineering, ML, Data Analytics
        ├── Projects.jsx             # Gallery of 4 featured projects
        ├── ProjectModal.jsx         # Detailed modal viewer for each project
        ├── Experience.jsx           # Vertical internship timeline
        ├── Education.jsx            # Loyola Institute of Technology degree & school details
        ├── Certifications.jsx       # 7 resume credentials with category badges
        ├── Contact.jsx              # Direct mailto, copy email, phone, location & resume hub
        ├── Footer.jsx               # Dynamic copyright, back-to-top button, exact titles
        ├── ScrollToTop.jsx          # Smooth floating back-to-top button
        ├── ResumeButton.jsx         # Multi-variant resume download/view component
        └── ResumeSettingsModal.jsx  # Interactive modal to swap or update resume
```

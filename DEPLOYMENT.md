# 🚀 Deploying to Vercel

## Method 1: Via Vercel Dashboard (Easiest - Recommended)

### Step 1: Prepare Your Project

Your project is already configured with `vercel.json`!

### Step 2: Create Build

Run this command to test if your project builds successfully:

```bash
npm run build
```

If build succeeds, you're ready to deploy!

### Step 3: Deploy to Vercel

**Option A: Drag & Drop**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Click "Browse" or drag your project folder
5. Wait for deployment (~2 minutes)

**Option B: Git Integration**

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import from GitHub
5. Select your repository
6. Click "Deploy"

---

## Method 2: Via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
vercel
```

Follow the prompts:

- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **ai-shield** (or any name)
- Directory? **./**
- Override settings? **N**

Your site will be live in seconds! 🎉

---

## Method 3: Quick Deploy with `vercel.json`

Since we already created `vercel.json`, you can also:

```bash
# One-time deployment
npx vercel

# Production deployment
npx vercel --prod
```

---

## 📝 Notes

- **Build Time**: ~2-3 minutes
- **First Deploy**: Free tier gets unlimited deployments
- **Custom Domain**: Add your domain in Vercel dashboard
- **Auto-deploy**: Every git push auto-deploys (if using Git)

---

## ✅ After Deployment

1. Your site will be live at: `https://ai-shield.vercel.app` (or similar)
2. You'll get a unique URL from Vercel
3. You can add a custom domain in settings
4. Every code push auto-deploys (if using Git integration)

---

## 🔧 Troubleshooting

**Build Errors?**

```bash
npm run build
```

Check output for errors and fix them.

**Module Not Found?**
Make sure all dependencies are in `package.json`:

```bash
npm install
npm run build
```

**Tailwind Not Working?**
Verify `tailwind.config.js` is correct and all files in `src/` are included in the content paths.

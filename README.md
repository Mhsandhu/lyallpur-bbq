# LYALLPUR BAR-B-Q Website

A modern, premium restaurant website with WhatsApp ordering and Netlify CMS integration.

## Features

- 🍖 Premium BBQ-themed UI with neon styling
- 📱 WhatsApp ordering integration
- 🛒 Multi-item shopping cart
- 📸 Image gallery for menu items
- 🔍 Menu search functionality
- 📱 Fully responsive (mobile-first)
- 🔐 Admin panel with Netlify CMS (Decap CMS)
- 🎨 Modern design with Tailwind CSS

## Tech Stack

- **React** + **Vite** (JavaScript)
- **Tailwind CSS** for styling
- **Netlify CMS (Decap CMS)** for content management
- **Netlify Identity** for admin authentication

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Netlify CMS Setup & Deployment

### Step 1: Deploy to Netlify

1. **Push your code to GitHub:**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin <your-github-repo-url>
     git push -u origin main
     ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

### Step 2: Enable Netlify Identity

1. **In Netlify Dashboard:**
   - Go to **Site settings** → **Identity**
   - Click **Enable Identity**

2. **Configure Identity:**
   - Go to **Registration preferences**
   - Set to **"Invite only"** (recommended for security)
   - Click **Save**

3. **Enable Git Gateway:**
   - In the Identity section, scroll to **Services**
   - Click **Enable Git Gateway**
   - This allows the CMS to commit changes to your repository

### Step 3: Invite Yourself as Admin

1. **In Netlify Dashboard:**
   - Go to **Identity** → **Invite users**
   - Enter your email address
   - Click **Send invite**

2. **Accept the invitation:**
   - Check your email for the invitation
   - Click the invitation link
   - Set your password
   - You're now an admin!

### Step 4: Access Admin Panel

1. **Visit the admin panel:**
   - Go to `https://your-site.netlify.app/admin`
   - Or click "Admin Login" in the website footer

2. **Login:**
   - Use your email and password
   - You'll be redirected to the CMS interface

### Step 5: Edit Menu Items

1. **In the CMS:**
   - Click on **"Menu"** collection
   - You'll see the current menu items

2. **Edit an item:**
   - Click on any menu item
   - Update:
     - Name, Category, Portion
     - Price (number)
     - Description (optional)
     - Tags (Bestseller, Spicy, Special, etc.)
     - Image (click to upload new image)
   - Click **"Save"**

3. **Add new item:**
   - Click **"New Menu Item"**
   - Fill in all required fields
   - Upload an image
   - Click **"Save"**

4. **Publish changes:**
   - After saving, click **"Publish"** or **"Save & Publish"**
   - This creates a commit in your GitHub repository
   - Netlify will automatically rebuild and redeploy your site
   - Changes will be live in 1-2 minutes

### Important Notes

- **Image Uploads:**
  - Images are stored in `public/images/`
  - Image URLs are automatically set to `/images/<filename>`
  - Supported formats: JPG, PNG, GIF, WebP

- **Menu Data:**
  - Menu data is stored in `public/data/menu.json`
  - The website fetches this file at runtime
  - If the fetch fails, it falls back to the local menu data

- **Publishing:**
  - Each publish creates a Git commit
  - Netlify automatically rebuilds the site
  - No manual deployment needed!

## Project Structure

```
├── public/
│   ├── admin/           # Netlify CMS admin panel
│   │   ├── index.html
│   │   └── config.yml
│   ├── data/
│   │   └── menu.json    # CMS-managed menu data
│   └── images/          # Menu item images
├── src/
│   ├── components/      # React components
│   ├── config/          # Site configuration
│   ├── data/            # Data loaders
│   └── utils/           # Utility functions
└── netlify.toml         # Netlify configuration
```

## Configuration

### Site Config
Edit `src/config/siteConfig.js` to update:
- Restaurant name
- WhatsApp number
- Address
- Opening hours
- Delivery fee

### Menu Items
Edit via Netlify CMS at `/admin` or directly edit `public/data/menu.json`

## Troubleshooting

### Admin panel not loading?
- Make sure Netlify Identity is enabled
- Check that Git Gateway is enabled
- Verify you're logged in with an invited user

### Menu not updating?
- Check browser console for errors
- Verify `public/data/menu.json` exists
- Ensure the file is properly formatted JSON
- Check Netlify build logs

### Images not showing?
- Verify images are in `public/images/`
- Check image paths in `menu.json` start with `/images/`
- Ensure images are committed to Git

## Support

For issues or questions:
- Check Netlify documentation: https://docs.netlify.com/
- Decap CMS docs: https://decapcms.org/docs/

## License

All rights reserved - LYALLPUR BAR-B-Q


# Installation Guide 🛠️

This guide provides detailed instructions for setting up the Air Quality Dashboard on your local development environment.

## 📋 Table of Contents
- [System Requirements](#system-requirements)
- [Quick Installation](#quick-installation)
- [Detailed Installation](#detailed-installation)
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)
- [Docker Setup](#docker-setup)

## 💻 System Requirements

### Minimum Requirements
- **Operating System**: Windows 10, macOS 10.15, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 16.0 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space for dependencies
- **Browser**: Modern browser with ES6+ support

### Recommended Requirements
- **Node.js**: Version 18.0 or higher (LTS)
- **RAM**: 8GB or more
- **Storage**: 1GB free space
- **Internet**: Stable connection for dependency downloads

### Supported Browsers
- **Chrome**: Version 90+
- **Firefox**: Version 88+
- **Safari**: Version 14+
- **Edge**: Version 90+

## ⚡ Quick Installation

For experienced developers who want to get started immediately:

```bash
# Clone and setup
git clone https://github.com/AegisX-dev/Air-Quality-Dashboard.git
cd Air-Quality-Dashboard
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Detailed Installation

### Step 1: Install Node.js

#### Windows
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer (.msi file)
3. Follow the installation wizard
4. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

#### macOS
**Option A: Official Installer**
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the .pkg installer
3. Follow installation steps

**Option B: Homebrew**
```bash
brew install node
```

#### Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 2: Install Git

#### Windows
1. Download from [git-scm.com](https://git-scm.com/)
2. Run installer with default settings
3. Verify: `git --version`

#### macOS
```bash
# Using Homebrew
brew install git

# Or use Xcode Command Line Tools
xcode-select --install
```

#### Linux
```bash
sudo apt update
sudo apt install git
```

### Step 3: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/AegisX-dev/Air-Quality-Dashboard.git

# Using SSH (if you have SSH keys set up)
git clone git@github.com:AegisX-dev/Air-Quality-Dashboard.git

# Navigate to project directory
cd Air-Quality-Dashboard
```

### Step 4: Install Dependencies

```bash
# Install all project dependencies
npm install

# Alternative: Use yarn if preferred
yarn install
```

**Dependencies installed:**
- React 18.2.0 - Frontend framework
- Vite 4.5.13 - Build tool and dev server
- Chart.js 4.4.1 - Data visualization
- Tailwind CSS 3.4.1 - Styling framework
- Framer Motion 10.16.16 - Animations
- Lucide React 0.302.0 - Icons

### Step 5: Start Development Server

```bash
# Start the development server
npm run dev

# Server will start on http://localhost:5173
```

## 🔧 Development Setup

### Environment Configuration

Create a `.env.local` file in the root directory for local environment variables:

```env
# Development settings
VITE_APP_NAME="Air Quality Dashboard"
VITE_APP_VERSION="1.0.0"

# API settings (if using external APIs)
VITE_API_BASE_URL="https://api.example.com"

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID="GA_MEASUREMENT_ID"
```

### IDE Configuration

#### VS Code (Recommended)
Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### VS Code Settings
Add to your workspace settings (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "html"
  }
}
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run dev:host     # Start server accessible from network

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Linting and Formatting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Analysis
npm run analyze      # Analyze bundle size
npm run type-check   # TypeScript type checking
```

## 🚀 Production Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# The build output will be in the 'dist' folder
ls dist/
```

### Static Hosting (Vercel, Netlify)

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to configure your deployment
```

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Self-Hosting

#### Apache
```apache
# .htaccess file for Apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Handle Angular/React Router
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🐳 Docker Setup

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  air-quality-dashboard:
    build: .
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Running with Docker
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Error: Port 5173 is already in use
# Solution: Use a different port
npm run dev -- --port 3001
```

#### Node Version Issues
```bash
# Check your Node.js version
node --version

# If too old, upgrade Node.js
# Use nvm (Node Version Manager)
nvm install 18
nvm use 18
```

#### Dependency Conflicts
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors
```bash
# Check for TypeScript errors
npm run type-check

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Performance Issues

#### Slow Development Server
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=8192"
npm run dev
```

#### Large Bundle Size
```bash
# Analyze bundle
npm run analyze

# Check for duplicate dependencies
npm ls --depth=0
```

### Environment Issues

#### Missing Environment Variables
Create `.env.local` with required variables:
```env
VITE_APP_NAME="Air Quality Dashboard"
```

#### CORS Issues in Development
Add to `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    cors: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

## 📞 Getting Help

### Before Asking for Help
1. **Check this guide** for common solutions
2. **Search existing issues** on GitHub
3. **Try the troubleshooting steps** above
4. **Check the browser console** for error messages

### Where to Get Help
- **GitHub Issues**: [Report bugs or ask questions](https://github.com/AegisX-dev/Air-Quality-Dashboard/issues)
- **GitHub Discussions**: [Community discussions](https://github.com/AegisX-dev/Air-Quality-Dashboard/discussions)
- **Documentation**: Check other docs in this repository

### When Reporting Issues
Include this information:
- **Operating System**: Windows 10, macOS 12, Ubuntu 20.04, etc.
- **Node.js Version**: Output of `node --version`
- **Browser**: Chrome 96, Firefox 94, etc.
- **Error Messages**: Copy exact error text
- **Steps to Reproduce**: What you did before the error occurred

## 🎉 Next Steps

After successful installation:

1. **Explore the application** - Navigate through different pages
2. **Read the documentation** - Check [DATA.md](./DATA.md) for data information
3. **Customize the dashboard** - Modify colors, add features
4. **Contribute** - See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines

---

🌟 **Congratulations!** You now have the Air Quality Dashboard running locally. Happy coding!

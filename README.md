<div align="center">
  <img src="src/assets/logo.jpeg" alt="ClaireStreams Logo" width="120" height="120" style="border-radius: 20px;" />
  
  # ClaireStreams
  
  **Share your screen, beautifully.**
</div>

ClaireStreams is a lightweight, purely peer-to-peer screen broadcasting web application built with React, Vite, and WebRTC. It provides a stunning, Mediterranean-inspired user interface for sharing your screen directly with others without routing through intermediate servers.

## ✨ Features

- **Pure P2P Broadcasting:** Zero server-side video processing. Streams go directly from the host to the viewers.
- **Beautiful UI:** A handcrafted, glassmorphic Mediterranean aesthetic featuring warm sand, sky blue, and pastel lemon colors.
- **Seamless Dark Mode:** Instantly toggle between a bright Mediterranean day and a glowing midnight ocean theme.
- **Session Notes:** Integrated sidebar for hosts and guests to jot down thoughts during the broadcast.
- **Zero Configuration:** Start a broadcast with one click and share the invite link instantly.

## 🚀 Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Vanilla + PostCSS)
- **Networking:** WebRTC (RTCPeerConnection)
- **Routing:** React Router DOM

## 💻 Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/clairestreams.git
   cd clairestreams
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to start broadcasting!

## 📦 Production Build & Deployment

ClaireStreams is a static Single Page Application (SPA). It can be deployed effortlessly to any static hosting provider.

To build the application for production:
```bash
npm run build
```
The optimized production files will be output to the `dist` directory.

### Deploying to Netlify
A `netlify.toml` file is included to automatically handle client-side routing.
1. Connect your GitHub repository to Netlify.
2. Set the Build Command to `npm run build`.
3. Set the Publish Directory to `dist`.

### Deploying to Vercel
Vercel will automatically detect Vite and configure the build settings.
1. Import the repository in Vercel.
2. Deploy!

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---
*Built with love for beautiful peer-to-peer communication.*

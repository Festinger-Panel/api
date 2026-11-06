// Universal Backend Configuration Loader (https://api-festinger.vercel.app)
(function (root) {
  const API_BASE_URL = "https://api-festinger.vercel.app";
  const env = (typeof process !== "undefined" && process.env) ? process.env : {};

  const defaultConfig = {
    apiBaseUrl: API_BASE_URL,
    firebaseConfig: {
      apiKey: env.FIREBASE_API_KEY || "AIzaSyCKA0k_9UgoJX_RBgEsIeNdiW2w0Okko1o",
      authDomain: env.FIREBASE_AUTH_DOMAIN || "festie-s1u2h3.firebaseapp.com",
      projectId: env.FIREBASE_PROJECT_ID || "festie-s1u2h3",
      storageBucket: env.FIREBASE_STORAGE_BUCKET || "festie-s1u2h3.firebasestorage.app",
      messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || "794049194885",
      appId: env.FIREBASE_APP_ID || "1:794049194885:web:8f75f0df4c15cde15eb2ec",
      measurementId: env.FIREBASE_MEASUREMENT_ID || "G-P2TS8F6LLJ"
    },
    imagekitConfig: {
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/xaeyi0zod",
      publicKey: env.IMAGEKIT_PUBLIC_KEY || "public_0bi0g0Be7VPBxmC2dHgSTmRQnc4=",
      privateKey: env.IMAGEKIT_PRIVATE_KEY || "private_rziY5TLh297gpPajEPUItbQA+So="
    }
  };

  async function loadBackendEnv() {
    if (typeof fetch !== "function") return defaultConfig;
    try {
      // Fetch live credentials from https://api-festinger.vercel.app/api/config
      const res = await fetch(`${API_BASE_URL}/api/config`, { cache: "no-store" });
      if (res.ok) {
        const remoteData = await res.json();
        if (remoteData.firebaseConfig) {
          Object.assign(defaultConfig.firebaseConfig, remoteData.firebaseConfig);
        }
        if (remoteData.imagekitConfig) {
          Object.assign(defaultConfig.imagekitConfig, remoteData.imagekitConfig);
        }
        return defaultConfig;
      }
    } catch (_) {
      // Fallback to config loaded from https://api-festinger.vercel.app/config.js
    }
    return defaultConfig;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ...defaultConfig, loadBackendEnv };
  }
  if (root) {
    root.BACKEND_CONFIG = defaultConfig;
    root.loadBackendEnv = loadBackendEnv;
  }
})(typeof window !== "undefined" ? window : globalThis);

// Universal Backend Configuration Loader (Browser & Node.js)
(function (root) {
  const env = (typeof process !== "undefined" && process.env) ? process.env : {};

  const defaultConfig = {
    adminAuth: {
      username: env.ADMIN_USERNAME || "aslan",
      password: env.ADMIN_PASSWORD || "340"
    },
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

  function parseDotEnv(text) {
    const parsed = {};
    text.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) return;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      parsed[key] = val;
    });
    return parsed;
  }

  async function loadBackendEnv(envPath = "../backend/.env") {
    if (typeof fetch !== "function") return defaultConfig;
    try {
      const res = await fetch(envPath, { cache: "no-store" });
      if (!res.ok) return defaultConfig;
      const text = await res.text();
      const parsed = parseDotEnv(text);

      if (parsed.ADMIN_USERNAME) defaultConfig.adminAuth.username = parsed.ADMIN_USERNAME;
      if (parsed.ADMIN_PASSWORD) defaultConfig.adminAuth.password = parsed.ADMIN_PASSWORD;

      if (parsed.FIREBASE_API_KEY) defaultConfig.firebaseConfig.apiKey = parsed.FIREBASE_API_KEY;
      if (parsed.FIREBASE_AUTH_DOMAIN) defaultConfig.firebaseConfig.authDomain = parsed.FIREBASE_AUTH_DOMAIN;
      if (parsed.FIREBASE_PROJECT_ID) defaultConfig.firebaseConfig.projectId = parsed.FIREBASE_PROJECT_ID;
      if (parsed.FIREBASE_STORAGE_BUCKET) defaultConfig.firebaseConfig.storageBucket = parsed.FIREBASE_STORAGE_BUCKET;
      if (parsed.FIREBASE_MESSAGING_SENDER_ID) defaultConfig.firebaseConfig.messagingSenderId = parsed.FIREBASE_MESSAGING_SENDER_ID;
      if (parsed.FIREBASE_APP_ID) defaultConfig.firebaseConfig.appId = parsed.FIREBASE_APP_ID;
      if (parsed.FIREBASE_MEASUREMENT_ID) defaultConfig.firebaseConfig.measurementId = parsed.FIREBASE_MEASUREMENT_ID;

      if (parsed.IMAGEKIT_URL_ENDPOINT) defaultConfig.imagekitConfig.urlEndpoint = parsed.IMAGEKIT_URL_ENDPOINT;
      if (parsed.IMAGEKIT_PUBLIC_KEY) defaultConfig.imagekitConfig.publicKey = parsed.IMAGEKIT_PUBLIC_KEY;
      if (parsed.IMAGEKIT_PRIVATE_KEY) defaultConfig.imagekitConfig.privateKey = parsed.IMAGEKIT_PRIVATE_KEY;
    } catch (_) {
      // Fallback to defaultConfig when opened via file:// protocol
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

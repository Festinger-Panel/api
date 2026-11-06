// Vercel Serverless API Endpoint: https://api-festinger.vercel.app/api/config
module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json({
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCKA0k_9UgoJX_RBgEsIeNdiW2w0Okko1o",
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || "festie-s1u2h3.firebaseapp.com",
      projectId: process.env.FIREBASE_PROJECT_ID || "festie-s1u2h3",
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "festie-s1u2h3.firebasestorage.app",
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "794049194885",
      appId: process.env.FIREBASE_APP_ID || "1:794049194885:web:8f75f0df4c15cde15eb2ec",
      measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-P2TS8F6LLJ"
    },
    imagekitConfig: {
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/xaeyi0zod",
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "public_0bi0g0Be7VPBxmC2dHgSTmRQnc4=",
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "private_rziY5TLh297gpPajEPUItbQA+So="
    }
  });
};


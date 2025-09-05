import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 4002,
  frontendUrl: process.env.FRONTEND_URL,
  mongoUrl: process.env.MONGO_URL,
  cloudinary: {
    cloudName: process.env.cloud_name,
    apiKey: process.env.api_key,
    apiSecret: process.env.api_secret,
  },
  jwt: {
    userPassword: process.env.JWT_USER_PASSWORD,
    adminPassword: process.env.JWT_ADMIN_PASSWORD,
  },
  nodeEnv: process.env.NODE_ENV || "development",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};

export default config;
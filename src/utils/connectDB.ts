import { Sequelize } from "sequelize";
const { POSTGRES_PASS, POSTGRES_USER, POSTGRES_DB, DATABASE_URL } = process.env;

export const sequelize = new Sequelize(DATABASE_URL as string, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  dialectOptions: {
    family: 4,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDB = async function () {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Supabase PostgreSQL successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw error;
  }
};

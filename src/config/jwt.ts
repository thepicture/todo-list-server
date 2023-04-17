import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const EXPIRES_IN_24_HOURS = 1000 * 60 * 60 * 24;
export const TO_MILLISECONDS = 1000;

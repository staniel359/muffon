import dotenv from 'dotenv'
import {
  envFilePath
} from './paths.js'

dotenv.config(
  {
    path: envFilePath
  }
)

export const electronStoreKey =
  process
    .env
    .VITE_APP_ELECTRON_STORE_KEY

export const discordClientId =
  process
    .env
    .VITE_APP_DISCORD_CLIENT_ID

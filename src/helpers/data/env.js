import {
  ipcRenderer
} from 'electron'

export const anonymousToken =
  import.meta.env.VITE_APP_ANONYMOUS_TOKEN

export const shareEncryptionKey =
  import.meta.env.VITE_APP_SHARE_ENCRYPTION_KEY

export const systemName =
  await ipcRenderer.invoke(
    'get-system-name'
  )

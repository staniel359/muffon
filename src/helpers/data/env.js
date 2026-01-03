export const guestToken =
  import.meta.env.VITE_APP_GUEST_TOKEN

export const shareEncryptionKey =
  import.meta.env.VITE_APP_SHARE_ENCRYPTION_KEY

export const systemName =
  await window
    .mainProcess
    .sendAsyncCommand(
      'get-system-name'
    )

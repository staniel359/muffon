export default function () {
  if (!tray) { return }

  tray.destroy()

  tray = null
}

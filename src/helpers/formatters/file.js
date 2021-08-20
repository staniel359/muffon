import fs from 'fs'

export const tags = (tags, file) => {
  const image = formatImage(
    tags.APIC
  )

  return {
    title: tags.TIT2?.data,
    artist: {
      name: tags.TPE1?.data
    },
    album: {
      title: tags.TALB?.data
    },
    image: {
      extrasmall: image,
      medium: image
    },
    created: fs.statSync(
      file.path
    ).birthtime
  }
}

const formatImage = data => {
  if (data) {
    const imageFormat = data.data.format

    const processImageByte = byte => {
      return String.fromCharCode(byte)
    }

    const imageDecoded = data.data.data.map(
      processImageByte
    ).join('')

    const imageBase64 = window.btoa(
      imageDecoded
    )

    return [
      `data:${imageFormat}`,
      `base64,${imageBase64}`
    ].join(';')
  }
}

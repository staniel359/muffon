import {
  generateKey
} from '@/helpers/utils'

export async function convertBlobToData (
  {
    blob
  }
) {
  const reader =
    new FileReader()

  function handleLoadEnd () {
    const url =
      URL.createObjectURL(
        blob
      )

    return {
      uuid: generateKey(),
      url,
      data: reader.result
    }
  }

  return new Promise(
    (
      resolve,
      reject
    ) => {
      reader.onerror = () => {
        reject(
          new Error()
        )
      }

      reader.onloadend = () => {
        resolve(
          handleLoadEnd()
        )
      }

      reader.readAsDataURL(
        blob
      )
    }
  )
}

export async function convertLinkToData (
  {
    link
  }
) {
  const image =
    await fetch(
      link
    )

  const blob =
    await image.blob()

  return convertBlobToData(
    {
      blob
    }
  )
}

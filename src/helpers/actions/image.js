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
  function handleError () {
    return null
  }

  const image =
    await fetch(
      link
    ).catch(
      handleError
    )

  if (!image) { return }

  const blob =
    await image.blob()

  return convertBlobToData(
    {
      blob
    }
  )
}

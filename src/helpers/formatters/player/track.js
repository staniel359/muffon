export function track (
  {
    trackData,
    artistName,
    albumTitle,
    imageData,
    isFromSource
  }
) {
  const trackArtistsData = artistName && {
    artists: [
      {
        name: artistName
      }
    ]
  }

  const trackAlbumData = albumTitle && {
    album: {
      title: albumTitle
    }
  }

  const trackImageData = imageData && {
    image: imageData
  }

  const trackOtherData = {
    from_source: !!isFromSource
  }

  return {
    ...trackData,
    ...trackArtistsData,
    ...trackAlbumData,
    ...trackImageData,
    ...trackOtherData
  }
}

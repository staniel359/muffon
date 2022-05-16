export function track (
  {
    trackData,
    artistName,
    albumData,
    imageData,
    isFromSource
  }
) {
  const trackArtistsData = artistName && {
    artist: {
      name: artistName
    },
    artists: [
      {
        name: artistName
      }
    ]
  }

  const trackAlbumData = albumData && {
    album: albumData
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

export function track (
  {
    trackData,
    artistName,
    albumData,
    imageData,
    isFromSource,
    isFromRadio
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
    from_source: !!isFromSource,
    from_radio: !!isFromRadio
  }

  return {
    ...trackData,
    ...trackArtistsData,
    ...trackAlbumData,
    ...trackImageData,
    ...trackOtherData
  }
}

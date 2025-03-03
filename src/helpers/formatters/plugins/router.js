export function params (
  {
    params
  }
) {
  const {
    profileId,
    conversationId,
    libraryArtistId,
    libraryAlbumId,
    libraryTrackId,
    libraryTagId,
    playlistId,
    communityId
  } = params

  return {
    ...params,
    ...(profileId && {
      profileId: parseInt(
        profileId
      )
    }),
    ...(conversationId && {
      conversationId: parseInt(
        conversationId
      )
    }),
    ...(libraryArtistId && {
      libraryArtistId: parseInt(
        libraryArtistId
      )
    }),
    ...(libraryAlbumId && {
      libraryAlbumId: parseInt(
        libraryAlbumId
      )
    }),
    ...(libraryTrackId && {
      libraryTrackId: parseInt(
        libraryTrackId
      )
    }),
    ...(libraryTagId && {
      libraryTagId: parseInt(
        libraryTagId
      )
    }),
    ...(playlistId && {
      playlistId: parseInt(
        playlistId
      )
    }),
    ...(communityId && {
      communityId: parseInt(
        communityId
      )
    })
  }
}

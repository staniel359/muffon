export function main (
  {
    playlistId
  }
) {
  return {
    name: 'VideoPlaylistMainPage',
    params: {
      playlistId
    },
    path: `video/videoPlaylists/${playlistId}`
  }
}

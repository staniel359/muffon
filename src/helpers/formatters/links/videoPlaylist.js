export function main (
  {
    playlistId
  }
) {
  return {
    name: 'VideoPlaylistPage',
    params: {
      playlistId
    },
    path: `video/videoPlaylists/${playlistId}`
  }
}

export const main = ({ artistName, trackTitle }) => {
  return {
    name: 'TrackMainPage',
    params: { artistName, trackTitle },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'tracks',
      encodeURIComponent(trackTitle)
    ].join('/')
  }
}

export const similar = ({ artistName, trackTitle }) => {
  return {
    name: 'TrackSimilarPage',
    params: { artistName, trackTitle },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'tracks',
      encodeURIComponent(trackTitle),
      'similar'
    ].join('/')
  }
}

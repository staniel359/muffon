import fetchIdData from '#/actions/api/id/bandcamp/fetchData'

export default async function ({ trackData }) {
  const idDataArgs = {
    model: trackData.bandcamp_model,
    title: trackData.bandcamp_title,
    artistName: trackData.artist.bandcamp_name
  }

  const idData = await fetchIdData(idDataArgs)

  return {
    ...idData,
    source: 'bandcamp'
  }
}

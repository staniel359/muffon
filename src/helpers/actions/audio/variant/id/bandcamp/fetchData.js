import fetchIdData from '#/actions/api/id/bandcamp/fetchData'

export default async function ({ trackData }) {
  const idDataArgs = {
    model: trackData.bandcamp_model,
    title: trackData.bandcamp_slug,
    artistName: trackData.artists[0].bandcamp_slug
  }

  const idData = await fetchIdData(idDataArgs)

  return {
    ...idData,
    source_id: 'bandcamp'
  }
}

import getBandcampId from '*/helpers/actions/api/bandcampId/get'

export default async function ({ trackData }) {
  const bandcampIdArgs = {
    model:
      trackData.bandcamp_model,
    title:
      trackData.bandcamp_slug,
    artist:
      trackData.artists[0].bandcamp_slug
  }

  const idData =
    await getBandcampId(
      bandcampIdArgs
    )

  return {
    ...idData,
    source_id: 'bandcamp'
  }
}

import getBandcampId from '#/actions/api/bandcamp_id/get'

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

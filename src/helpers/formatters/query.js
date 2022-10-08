export default function (
  {
    query
  }
) {
  const queryFiltered =
    Object.entries(
      query
    ).filter(
      pair => pair[1]
    )

  const queryData =
    Object.fromEntries(
      queryFiltered
    )

  const queryString =
    new URLSearchParams(
      queryData
    ).toString()

  return {
    data: queryData,
    string: queryString
  }
}

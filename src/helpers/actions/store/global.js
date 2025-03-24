export function update (
  data,
  {
    isSave = true
  } = {}
) {
  const dataFormatted =
    JSON.stringify(
      data
    )

  return window
    .mainProcess
    .sendAsyncCommand(
      'update-store',
      dataFormatted,
      {
        isSave
      }
    )
}

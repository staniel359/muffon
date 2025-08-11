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
      'call-update-store',
      dataFormatted,
      {
        isSave
      }
    )
}

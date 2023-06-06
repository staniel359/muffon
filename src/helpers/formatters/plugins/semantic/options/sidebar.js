export function main (
  {
    onShow,
    onHide
  } = {}
) {
  return {
    closable: false,
    dimPage: false,
    onShow,
    onHide
  }
}

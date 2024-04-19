export default function (
  {
    text,
    className
  }
) {
  const classNameFormatted = [
    'ui main-link',
    className
  ].filter(
    e => e
  ).join(
    ' '
  )

  return text.replaceAll(
    '<a href=',
    `<a
      class="${classNameFormatted}"
      target="_blank"
      href=
    `
  )
}

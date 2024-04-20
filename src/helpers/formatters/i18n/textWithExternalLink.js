export default function (
  {
    text,
    linksData,
    className
  }
) {
  const classNameFormatted = [
    'main-link',
    className
  ].filter(
    e => e
  ).join(
    ' '
  )

  function replaceString (
    _,
    key
  ) {
    return `<a
      target="_blank"
      class="${classNameFormatted}"
      href="${linksData[key]}"
    >`
  }

  return text.replace(
    /\[a link=(\w+)\]/,
    replaceString
  ).replace(
    '[/a]',
    '</a>'
  )
}

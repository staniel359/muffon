export default function (
  {
    html,
    isInline
  }
) {
  const className = 'ui popup main-popup small'

  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    inline: isInline,
    exclusive: true,
    delay: 0,
    className: {
      popup: className
    },
    html
  }
}

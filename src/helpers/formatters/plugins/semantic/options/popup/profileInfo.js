import {
  handleFadeShow,
  handleFadeVisible,
  handleFadeHide
} from '@/helpers/actions/plugins/semantic/popup'

export default function (
  {
    isFixed,
    html
  }
) {
  const className = [
    'ui popup main-popup small',
    (
      isFixed &&
        'main-fixed-popup'
    )
  ].filter(
    e => e
  ).join(
    ' '
  )

  return {
    position: 'right center',
    transition: 'fade right',
    variation: 'basic',
    exclusive: true,
    hoverable: true,
    delay: {
      show: 0,
      hide: 150
    },
    className: {
      popup: className
    },
    html,
    onShow () {
      handleFadeShow(
        this,
        'right'
      )
    },
    onVisible () {
      handleFadeVisible(
        this,
        'right'
      )
    },
    onHide () {
      handleFadeHide(
        this,
        'right'
      )
    }
  }
}

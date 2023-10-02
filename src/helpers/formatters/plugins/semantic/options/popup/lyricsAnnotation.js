import {
  handleFadeShow,
  handleFadeVisible,
  handleFadeHide
} from '@/helpers/actions/plugins/semantic/popup'

export default function (
  {
    html,
    onShow
  }
) {
  const className =
    'ui popup main-popup main-annotation-popup'

  return {
    position: 'right center',
    transition: 'fade right',
    variation: 'basic',
    exclusive: true,
    hoverable: true,
    lastResort: true,
    className: {
      popup: className
    },
    delay: {
      show: 600,
      hide: 150
    },
    html,
    onShow () {
      onShow()

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

import {
  handleFadeShow,
  handleFadeVisible,
  handleFadeHide
} from '@/helpers/actions/plugins/semantic/popup'

export default function (
  {
    html
  }
) {
  const className = 'ui popup main-popup small'

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

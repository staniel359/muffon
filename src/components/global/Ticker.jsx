import React from 'react'

export default class Ticker extends React.PureComponent {
  componentDidMount () {
    this.setStyle()
    this.handleTicker()
  }

  speed = 40
  startWait = true
  loopWait = true
  waitTime = 2000
  gap = 50

  setStyle () {
    this.ticker().style.overflow = 'hidden'

    this.container().style.display = 'flex'

    this.content().style.whiteSpace = 'nowrap'
    this.content().style.paddingRight = `${this.gap}px`
  }

  ticker = () => this.tickerRef.current

  tickerRef = React.createRef()

  container = () => this.tickerContainerRef.current

  tickerContainerRef = React.createRef()

  content = () => this.tickerContentRef.current

  tickerContentRef = React.createRef()

  handleTicker () {
    this.progress = 1

    const contentWidth = this.content().offsetWidth - this.gap
    const containerWidth = this.container().offsetWidth

    if (contentWidth < containerWidth) return

    const contentClone = this.content().cloneNode(true)

    this.container().appendChild(contentClone)

    this.startWait ? this.wait() : this.setSpeed()

    this.loop()
  }

  wait () {
    this.currentSpeed = 0

    setTimeout(() => this.setSpeed(), this.waitTime)
  }

  setSpeed () {
    this.currentSpeed = this.speed / 60
  }

  loop () {
    this.progress -= this.currentSpeed

    if (!this.content()) return

    const contentWidth = this.content().offsetWidth * -1

    if (this.progress <= contentWidth) {
      this.progress = 0

      this.loopWait && this.wait()
    }

    this.container().style.transform = `translateX(${this.progress}px)`

    window.requestAnimationFrame(() => this.loop())
  }

  render () {
    const { content, children } = this.props

    return (
      <div ref={this.tickerRef}>
        <div ref={this.tickerContainerRef}>
          <div ref={this.tickerContentRef}>{content || children}</div>
        </div>
      </div>
    )
  }
}

import React from 'react'

export default class Ticker extends React.PureComponent {
  constructor (props) {
    super(props)

    this.tickerRef = React.createRef()
    this.tickerContainerRef = React.createRef()
    this.tickerContentRef = React.createRef()

    this.speed = 40
    this.waitTime = 2000
    this.gap = 50
    this.isStartWait = true
    this.isLoopWait = true
  }

  componentDidMount () {
    this.setStyle()
    this.handleTicker()
  }

  setStyle () {
    this.ticker().style.overflow = 'hidden'

    this.container().style.display = 'flex'

    this.content().style.whiteSpace = 'nowrap'
    this.content().style.paddingRight = `${this.gap}px`
  }

  ticker = () => this.tickerRef.current

  container = () => this.tickerContainerRef.current

  content = () => this.tickerContentRef.current

  handleTicker () {
    this.progress = 1

    const contentWidth = this.content().offsetWidth - this.gap
    const containerWidth = this.container().offsetWidth

    if (contentWidth > containerWidth) {
      const contentClone = this.content().cloneNode(true)

      this.container().appendChild(contentClone)

      this.isStartWait ? this.wait() : this.setSpeed()

      this.loop()
    }
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

    if (this.content()) {
      const contentWidth = this.content().offsetWidth * -1

      if (this.progress <= contentWidth) {
        this.progress = 0

        this.isLoopWait && this.wait()
      }

      this.container().style.transform = `translateX(${this.progress}px)`

      window.requestAnimationFrame(() => this.loop())
    }
  }

  render () {
    const { content, children } = this.props

    const contentData = content || children

    return (
      <div ref={this.tickerRef}>
        <div ref={this.tickerContainerRef}>
          <div ref={this.tickerContentRef}>{contentData}</div>
        </div>
      </div>
    )
  }
}

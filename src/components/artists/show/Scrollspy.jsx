import React from 'react'

export default class Scrollspy extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.addScrollListener()
  }

  componentWillUnmount () {
    this.removeScrollListener()
  }

  addScrollListener () {
    window.addEventListener('scroll', this.handleWindowScroll, {
      passive: true
    })
  }

  handleWindowScroll = () => {
    this.toggleLeftColumnArtistName()
    this.changeMenuActiveItem()
  }

  toggleLeftColumnArtistName () {
    if (window.scrollY >= 60) {
      this.props.toggleLeftColumnArtistName(true)
    } else {
      this.props.toggleLeftColumnArtistName(false)
    }
  }

  changeMenuActiveItem () {
    this.menuActiveIfSegmentVisible('similar') ||
      this.menuActiveIfSegmentVisible('albums') ||
      this.menuActiveIfSegmentVisible('tracks') ||
      this.menuActiveIfSegmentVisible('info')
  }

  menuActiveIfSegmentVisible (segmentID) {
    if (this.isLowerThan(segmentID)) {
      this.props.setMenuActiveItem(segmentID)
      return true
    } else {
      return false
    }
  }

  isLowerThan (segmentID) {
    return window.scrollY >= this.props.segmentTop(segmentID)
  }

  removeScrollListener () {
    window.removeEventListener('scroll', this.handleWindowScroll, {
      passive: true
    })
  }

  render () {
    return <div id="scrollspy"></div>
  }
}

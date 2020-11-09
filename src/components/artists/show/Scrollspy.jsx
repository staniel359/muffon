import React from 'react'

export default class Scrollspy extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleWindowScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleWindowScroll)
  }

  handleWindowScroll = () => {
    this.toggleArtistName()
    this.changeMenuActiveItem()
  }

  toggleArtistName () {
    const bool = window.scrollY >= 60

    this.props.toggleArtistName(bool)
  }

  changeMenuActiveItem () {
    this.setActiveIfLowerThan('similar') ||
      this.setActiveIfLowerThan('albums') ||
      this.setActiveIfLowerThan('tracks') ||
      this.setActiveIfLowerThan('info')
  }

  setActiveIfLowerThan (segment) {
    if (this.isLowerThan(segment)) {
      this.props.setMenuActiveItem(segment)
      return true
    }
    return false
  }

  isLowerThan (segmentID) {
    return window.scrollY >= this.props.segmentTop(segmentID)
  }

  render () {
    return <div id="scrollspy" />
  }
}

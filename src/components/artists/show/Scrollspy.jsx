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
    if (this.isLowerThan('similar')) {
      this.props.setMenuActiveItem('similar')
    } else if (this.isLowerThan('albums')) {
      this.props.setMenuActiveItem('albums')
    } else if (this.isLowerThan('tracks')) {
      this.props.setMenuActiveItem('tracks')
    } else if (this.isLowerThan('info')) {
      this.props.setMenuActiveItem('info')
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

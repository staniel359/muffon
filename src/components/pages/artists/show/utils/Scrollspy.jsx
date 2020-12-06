import React from 'react'

export default class Scrollspy extends React.PureComponent {
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setArtistNameVisibility()
    this.setMenuActiveItem()
  }

  setArtistNameVisibility () {
    const isArtistNameVisible = window.scrollY >= 60

    this.props.setArtistNameVisibility(isArtistNameVisible)
  }

  setMenuActiveItem () {
    const { segmentTop } = this.props

    const menuItems = ['info', 'tracks', 'albums', 'similar']
    const isActiveItem = name => window.scrollY >= segmentTop(name)
    const activeItem = menuItems.reverse().find(isActiveItem)

    this.props.setMenuActiveItem(activeItem)
  }

  render () {
    return <div id="scrollspy" />
  }
}

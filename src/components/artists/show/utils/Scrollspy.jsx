import React from 'react'

export default class Scrollspy extends React.PureComponent {
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { setMenuActiveItem, segmentTop, toggleArtistName } = this.props
    const { scrollY } = window

    const bool = scrollY >= 60

    const menuItems = ['info', 'tracks', 'albums', 'similar']
    const isActiveItem = name => scrollY >= segmentTop(name)

    const activeItem = menuItems.reverse().find(isActiveItem)

    toggleArtistName(bool)
    setMenuActiveItem(activeItem)
  }

  render () {
    return <div id="scrollspy" />
  }
}

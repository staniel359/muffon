import React from 'react'
import { Label, Divider, Ref } from 'semantic-ui-react'
import Tags from 'global/Tags'
import Similar from './extra/Similar'

export default class Extra extends React.PureComponent {
  tagsData () {
    const { track } = this.props
    const { tags } = track

    const artistNameEncoded = encodeURIComponent(track.artist)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const tagsPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}/tags`
    const tagsProps = { tags, viewMore: true, link: tagsPageLink }

    return <Tags {...tagsProps} />
  }

  countersData () {
    const { track } = this.props

    const listenersCount = track.listeners_count.toLocaleString('eu')
    const playsCount = track.plays_count.toLocaleString('eu')

    return (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )
  }

  descriptionData () {
    const { description } = this.props.track

    return (
      <div className="pageDescription">{description || 'No description.'}</div>
    )
  }

  similarData () {
    const { track } = this.props

    const similarRef = React.createRef()

    const scrollToTop = segmentName => {
      const refs = { similarRef }
      const segment = refs[`${segmentName}Ref`].current
      const segmentTop = segment.offsetTop + 10

      window.scrollTo(0, segmentTop)
    }

    const similarProps = { track, scrollToTop }

    return (
      <Ref innerRef={similarRef}>
        <Similar {...similarProps} />
      </Ref>
    )
  }

  render () {
    return (
      <div className="trackPageExtra">
        {this.tagsData()}
        {this.countersData()}

        <Divider />

        {this.descriptionData()}

        <Divider />

        {this.similarData()}
      </div>
    )
  }
}

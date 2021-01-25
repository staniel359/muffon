import React from 'react'
import { Label, Divider, Ref } from 'semantic-ui-react'
import Tags from 'global/Tags'
import Similar from './extra/Similar'
import { Link } from 'react-router-dom'

export default class Extra extends React.PureComponent {
  tagsData () {
    const { track } = this.props

    const artistNameEncoded = encodeURIComponent(track.artist.name)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const tagsPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}/tags`
    const tagsProps = { tags: track.tags, viewMore: true, link: tagsPageLink }

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
    const { track } = this.props

    const artistNameEncoded = encodeURIComponent(track.artist.name)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const descriptionPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}/description`

    return (
      <React.Fragment>
        <Divider />

        <div>
          {track.description}
          {'\u00A0'}
          <Link to={descriptionPageLink}>Read more...</Link>
        </div>
      </React.Fragment>
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
    const { track } = this.props

    const tagsData = track.tags && this.tagsData()

    const descriptionData = track.description && this.descriptionData()

    return (
      <div className="trackPageExtra">
        {tagsData}
        {this.countersData()}
        {descriptionData}

        <Divider />

        {this.similarData()}
      </div>
    )
  }
}

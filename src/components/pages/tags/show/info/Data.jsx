import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { Image, Icon, Header, Label, Loader } from 'semantic-ui-react'
import Similar from './Similar'

export default class Data extends React.PureComponent {
  coverData () {
    const { artistImages } = this.props

    const artistImagesData = () => {
      const imagesData = artistImages.slice(0, 15)

      const imageData = src => (
        <Image
          className="tagPageSegmentMainCoverImage"
          key={uuid()}
          {...{ src }}
        />
      )

      return imagesData.map(imageData)
    }

    if (artistImages) {
      return artistImagesData()
    } else {
      return <Loader active inverted size="large" />
    }
  }

  contentData () {
    const { description } = this.props.tag

    const descriptionData = !!description && this.descriptionData()

    return (
      <div className="tagPageSegmentMainContent">
        {this.headerData()}
        {this.similarData()}
        {this.countersData()}
        {descriptionData}
      </div>
    )
  }

  headerData () {
    const { name } = this.props.tag

    return (
      <div className="tagPageTagName">
        <Icon name="tag" size="large" />
        <Header as="h1" content={name} />
      </div>
    )
  }

  similarData () {
    const { name } = this.props.tag

    return (
      <div className="tagPageSimilar">
        <Header as="h4" content="Similar:" />

        <Similar tagName={name} />
      </div>
    )
  }

  countersData () {
    const { tag } = this.props

    const taggersCount = tag.taggers_count.toLocaleString('eu')
    const taggingsCount = tag.taggings_count.toLocaleString('eu')

    return (
      <Label.Group className="tagPageCounters" size="large">
        <Label basic icon="user" content={taggersCount} />
        <Label basic icon="tags" content={taggingsCount} />
      </Label.Group>
    )
  }

  descriptionData () {
    const { name, description } = this.props.tag

    const tagNameEncoded = encodeURIComponent(name)
    const descriptionPageLink = `/tags/${tagNameEncoded}/description`

    return (
      <div className="tagPageDescription">
        {description}
        {'\u00A0'}
        <Link to={descriptionPageLink}>Read more...</Link>
      </div>
    )
  }

  render () {
    const coverData = (
      <div className="tagPageSegmentMainCover">{this.coverData()}</div>
    )

    return (
      <React.Fragment>
        {coverData}
        {this.contentData()}
      </React.Fragment>
    )
  }
}

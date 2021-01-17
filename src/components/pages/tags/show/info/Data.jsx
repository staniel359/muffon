import React from 'react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { Image, Icon, Header, Label, Loader } from 'semantic-ui-react'
import Similar from './Similar'

export default class Data extends React.PureComponent {
  render () {
    const { tag } = this.props
    const { artistImages } = this.props

    const imageData = src => (
      <Image
        className="tagPageSegmentMainCoverImage"
        key={uuid()}
        {...{ src }}
      />
    )
    const artistImagesListData =
      artistImages && artistImages.slice(0, 15).map(imageData)
    const loaderData = <Loader active inverted size="large" />
    const artistImagesData = artistImagesListData || loaderData
    const coverData = (
      <div className="tagPageSegmentMainCover">{artistImagesData}</div>
    )

    const headerData = (
      <div className="tagPageTagName">
        <Icon name="tag" size="large" />
        <Header as="h1" content={tag.name} />
      </div>
    )

    const taggersCount = tag.taggers_count.toLocaleString('eu')
    const taggingsCount = tag.taggings_count.toLocaleString('eu')
    const countersData = (
      <Label.Group className="tagPageCounters" size="large">
        <Label basic icon="user" content={taggersCount} />
        <Label basic icon="tags" content={taggingsCount} />
      </Label.Group>
    )

    const similarData = (
      <div className="tagPageSimilar">
        <Header as="h4" content="Similar:" />
        <Similar tagName={tag.name} />
      </div>
    )

    const tagNameEncoded = encodeURIComponent(tag.name)
    const descriptionPageLink = `/tags/${tagNameEncoded}/description`
    const descriptionData = tag.description && (
      <div className="tagPageDescription">
        {tag.description}
        {'\u00A0'}
        <Link to={descriptionPageLink}>Read more...</Link>
      </div>
    )

    const contentData = (
      <div className="tagPageSegmentMainContent">
        {headerData}
        {similarData}
        {countersData}
        {descriptionData}
      </div>
    )

    return (
      <React.Fragment>
        {coverData}
        {contentData}
      </React.Fragment>
    )
  }
}

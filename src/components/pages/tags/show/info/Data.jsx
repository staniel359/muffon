import React from 'react'
import { Image, Icon, Header, Label } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Data extends React.PureComponent {
  render () {
    const { tag } = this.props
    const { artistImages } = this.props

    const imageData = src => (
      <Image className="tagPageHeaderImage" key={uuid()} {...{ src }} />
    )
    const artistImagesList =
      artistImages && artistImages.slice(0, 18).map(imageData)
    const coverData = (
      <div className="tagsPageSegmentMainCover">{artistImagesList}</div>
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

    const descriptionData = (
      <div className="tagPageDescription">
        {tag.description || 'No description.'}
      </div>
    )

    const contentData = (
      <div className="tagsPageSegmentMainContent">
        {headerData}
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

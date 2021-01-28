import React from 'react'
import { Label } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

export default class Tags extends React.PureComponent {
  tagData = tag => {
    const tagName = tag.name || tag
    const tagNameEncoded = encodeURIComponent(tagName)
    const tagPageLink = `/tags/${tagNameEncoded}`

    const tagPercentData = !!tag.percent && (
      <Label.Detail content={`${tag.percent}%`} />
    )

    return (
      <Label key={uuid()} as={Link} to={tagPageLink}>
        {tagName}
        {tagPercentData}
      </Label>
    )
  }

  render () {
    const { tags, isViewMore, link } = this.props

    const tagsData = tags.map(this.tagData)

    const isMore = isViewMore && tags.length > 0
    const viewMoreData = isMore && <Label as={Link} to={link} content="..." />

    return (
      <Label.Group size="large">
        {tagsData}
        {viewMoreData}
      </Label.Group>
    )
  }
}

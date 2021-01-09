import React from 'react'
import { Label } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

export default class Tags extends React.PureComponent {
  render () {
    const { tags, viewMore, link } = this.props

    const tagName = tag => tag.name || tag
    const tagNameEncoded = tag => encodeURIComponent(tagName(tag))
    const tagPageLink = tag => `/tags/${tagNameEncoded(tag)}`

    const tagPercentData = tag =>
      tag.percent && <Label.Detail content={`${tag.percent}%`} />

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={tagPageLink(tag)}>
        {tagName(tag)}
        {tagPercentData(tag)}
      </Label>
    )
    const tagsData = tags.map(tagData)

    const tagsViewMoreData = viewMore && tags.length > 0 && (
      <Label as={Link} to={link} content="..." />
    )

    return (
      <Label.Group size="large">
        {tagsData}
        {tagsViewMoreData}
      </Label.Group>
    )
  }
}

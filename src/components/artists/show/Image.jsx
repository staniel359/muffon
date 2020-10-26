import React from 'react'
import { Image as SemanticImage, Dimmer, Placeholder } from 'semantic-ui-react'

export default class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  defaultImageSrc =
    'https://react.semantic-ui.com/images/wireframe/square-image.png'

  imageData () {
    if (this.props.image) {
      if (this.imageMissing()) {
        return this.imageDefault()
      } else {
        return this.artistImage()
      }
    } else {
      return this.imagePlaceholder()
    }
  }

  imageMissing () {
    return this.props.image === 'noImage'
  }

  imageDefault () {
    return <SemanticImage src={this.defaultImageSrc} />
  }

  artistImage () {
    return (
      <SemanticImage
        src={this.props.image.cropped_600}
        onClick={this.showDimmer}
        rounded
      />
    )
  }

  showDimmer = () => {
    this.setState({ dimmer: true })
  }

  imagePlaceholder () {
    return (
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>
    )
  }

  imageDimmerData () {
    if (this.props.image && !this.imageMissing()) {
      return this.imageDimmer()
    }
  }

  imageDimmer () {
    return (
      <Dimmer active={this.state.dimmer} onClick={this.hideDimmer} page>
        {this.imageOriginal()}
      </Dimmer>
    )
  }

  hideDimmer = () => {
    this.setState({ dimmer: false })
  }

  imageOriginal () {
    return <SemanticImage src={this.props.image.original} rounded centered />
  }

  render () {
    return (
      <React.Fragment>
        {this.imageData()}

        {this.imageDimmerData()}
      </React.Fragment>
    )
  }
}

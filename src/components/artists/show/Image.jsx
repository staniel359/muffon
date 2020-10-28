import React from 'react'
import { Image as SemanticImage, Dimmer, Placeholder } from 'semantic-ui-react'
import axios from 'axios'

export default class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  defaultImageSrc =
    'https://react.semantic-ui.com/images/wireframe/square-image.png'

  componentDidMount () {
    this.getImage()
  }

  getImage () {
    axios(this.imagesLink()).then(resp => this.setImage(resp))
  }

  imagesLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.props.artistName}/images`
    }
  }

  setImage (resp) {
    this.setState({
      image: resp.data.artist.images[0] || 'noImage'
    })
  }

  imageData () {
    if (this.state.image) {
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
    return this.state.image === 'noImage'
  }

  imageDefault () {
    return <SemanticImage src={this.defaultImageSrc} />
  }

  artistImage () {
    return (
      <SemanticImage
        src={this.state.image.cropped_600}
        onClick={this.showDimmer}
        rounded
      />
    )
  }

  showDimmer = () => {
    this.setState({ dimmer: true })
  }

  imagePlaceholder () {
    return <Placeholder content={<Placeholder.Image square />} />
  }

  imageDimmerData () {
    if (this.state.image && !this.imageMissing()) {
      return this.imageDimmer()
    }
  }

  imageDimmer () {
    return (
      <Dimmer
        active={this.state.dimmer}
        onClick={this.hideDimmer}
        content={this.imageOriginal()}
        page
      />
    )
  }

  hideDimmer = () => {
    this.setState({ dimmer: false })
  }

  imageOriginal () {
    return <SemanticImage src={this.state.image.original} rounded centered />
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

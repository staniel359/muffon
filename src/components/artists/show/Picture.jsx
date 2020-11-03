import React from 'react'
import { Image, Dimmer, Placeholder } from 'semantic-ui-react'
import axios from 'axios'

export default class Picture extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getImage()
  }

  getImage () {
    axios(this.imagesLink()).then(resp => this.setImage(resp))
  }

  imagesLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}/images`
    }
  }

  artistName = encodeURIComponent(this.props.artistName)

  setImage (resp) {
    this.setState({ image: this.responseImage(resp) })
  }

  responseImage (resp) {
    return resp.data.artist.images[0] || 'noImage'
  }

  imageData () {
    return this.state.image ? this.image() : this.imagePlaceholder()
  }

  image () {
    return (
      <div className="artistPageArtistPicture">
        <Image
          src={this.imageSrc()}
          onClick={this.handleImageClick}
          style={this.imageStyle()}
          rounded
        />
      </div>
    )
  }

  imageSrc () {
    return this.imageIsPresent() ? this.artistImage() : this.defaultSrc
  }

  imageIsPresent () {
    return this.state.image && !this.imageMissing()
  }

  imageMissing () {
    return this.state.image === 'noImage'
  }

  artistImage () {
    return this.state.image.cropped_600
  }

  defaultSrc =
    'https://lastfm.freetls.fastly.net/i/u/600x600/2a96cbd8b46e442fc41c2b86b821562f.png'

  handleImageClick = () => {
    this.imageIsClickable() && this.showDimmer()
  }

  imageIsClickable () {
    return this.imageIsPresent() && this.props.dimmer
  }

  showDimmer = () => {
    this.setState({ dimmer: true })
  }

  imageStyle () {
    return this.imageIsClickable() ? { cursor: 'pointer' } : {}
  }

  imagePlaceholder () {
    return <Placeholder content={<Placeholder.Image square />} />
  }

  dimmerData () {
    return this.imageIsClickable() && this.dimmer()
  }

  dimmer () {
    return (
      <Dimmer
        active={this.state.dimmer}
        onClick={this.hideDimmer}
        content={this.imageOriginal()}
        page
        className="artistPagePictureDimmer"
      />
    )
  }

  hideDimmer = () => {
    this.setState({ dimmer: false })
  }

  imageOriginal () {
    return <Image src={this.state.image.original} rounded centered />
  }

  render () {
    return (
      <React.Fragment>
        {this.imageData()}

        {this.dimmerData()}
      </React.Fragment>
    )
  }
}

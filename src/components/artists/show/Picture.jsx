import React from 'react'
import { Image, Dimmer, Placeholder } from 'semantic-ui-react'
import axios from 'axios'

export default class Picture extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  defaultSrc =
    'https://lastfm.freetls.fastly.net/i/u/600x600/2a96cbd8b46e442fc41c2b86b821562f.png'

  artistNameEncoded = encodeURIComponent(this.props.artistName)

  componentDidMount () {
    this.getImage()
  }

  getImage () {
    axios(this.imagesLink()).then(resp => this.setImage(resp))
  }

  imagesLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistNameEncoded}/images`
    }
  }

  setImage (resp) {
    const image = resp.data.artist.images[0] || 'noImage'
    this.setState({ image: image })
  }

  imageData () {
    return (this.state.image && this.image()) || this.imagePlaceholder()
  }

  image () {
    return (
      <Image
        src={this.imageSrc()}
        className="artistPagePicture"
        onClick={this.showDimmer}
        rounded
      />
    )
  }

  imageSrc () {
    return (this.imageMissing() && this.defaultSrc) || this.artistImage()
  }

  imageMissing () {
    return this.state.image === 'noImage'
  }

  artistImage () {
    return this.state.image.cropped_600
  }

  showDimmer = () => {
    this.setState({ dimmer: true })
  }

  imagePlaceholder () {
    return <Placeholder content={<Placeholder.Image square />} />
  }

  dimmerData () {
    return this.state.image && !this.imageMissing() && this.dimmer()
  }

  dimmer () {
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

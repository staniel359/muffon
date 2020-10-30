import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Header, Label, Divider } from 'semantic-ui-react'
import { HashRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'

export default class Info extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getInfo()
  }

  getInfo () {
    axios(this.infoLink())
      .then(resp => this.setInfo(resp))
      .catch(error => this.props.handleError(error))
      .then(() => this.props.stopLoader())
  }

  infoLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.props.artistName}`
    }
  }

  setInfo (resp) {
    this.setState({ info: resp.data.artist })
    this.props.setArtistName(resp.data.artist.name)
  }

  tags () {
    return (
      <Router>
        <Label.Group size="medium">
          {this.state.info.tags.map(tag => (
            <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
          ))}
          <Label as="a" content="..." />
        </Label.Group>
      </Router>
    )
  }

  counters () {
    return (
      <Label.Group size="large">
        <Label
          basic
          icon="user"
          content={this.format(this.state.info.listeners_count)}
        />
        <Label
          basic
          icon="music"
          content={this.format(this.state.info.plays_count)}
        />
      </Label.Group>
    )
  }

  format (number) {
    return number.toLocaleString('eu')
  }

  infoData () {
    return (
      <Segment className="artistPageSegment" id="info">
        <Header
          size="huge"
          className="artistPageArtistName"
          content={this.state.info.name}
        />

        {this.tags()}

        {this.counters()}

        <Divider />

        <div className="artistPageDescription">
          {this.state.info.description}
        </div>
      </Segment>
    )
  }

  render () {
    return <React.Fragment>{this.state.info && this.infoData()}</React.Fragment>
  }
}

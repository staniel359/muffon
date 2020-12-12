import React from 'react'
import axios from 'axios'
import getData from '../functions/getData'
import Tags from 'global/Tags'
import { Loader } from 'semantic-ui-react'

export default class Similar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'similar'

  tagNameEncoded = encodeURIComponent(this.props.tagName)

  render () {
    const { isLoading, data } = this.state

    const loaderData = isLoading && (
      <Loader active inverted inline size="mini" />
    )

    const tagsData = data && <Tags tags={data} />

    const contentData = loaderData || tagsData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}

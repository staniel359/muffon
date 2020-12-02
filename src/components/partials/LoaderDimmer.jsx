import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export default class LoaderDimmer extends React.PureComponent {
  render () {
    return (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )
  }
}

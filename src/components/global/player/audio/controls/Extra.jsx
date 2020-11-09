import React from 'react'
import Volume from './extra/Volume'
import Change from './extra/Change'
import Stop from './extra/Stop'

export default class Extra extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Volume />
        <Change />
        <Stop />
      </React.Fragment>
    )
  }
}

import React from 'react'
import ShuffleButtonContext from './main/ShuffleButtonContext'
import BackwardButtonContext from './main/BackwardButtonContext'
import PlayButtonContext from './main/PlayButtonContext'
import ForwardButtonContext from './main/ForwardButtonContext'
import RepeatButtonContext from './main/RepeatButtonContext'

export default class Main extends React.PureComponent {
  render () {
    return (
      <div>
        <ShuffleButtonContext />
        <BackwardButtonContext />
        <PlayButtonContext />
        <ForwardButtonContext />
        <RepeatButtonContext />
      </div>
    )
  }
}

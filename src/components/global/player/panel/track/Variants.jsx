import React from 'react'
import { Button, Segment, List, Ref } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import VariantContext from './VariantContext'

export default class Variants extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
  }

  componentDidMount () {
    this.variantsRef = React.createRef()
    this.variantsContentRef = React.createRef()

    document.addEventListener('click', this.handleClickOutside)
  }

  componentDidUpdate (prevProps, prevState) {
    const { currentTrackVariants } = this.props

    const isVariantsChanged =
      currentTrackVariants &&
      currentTrackVariants !== prevProps.currentTrackVariants

    isVariantsChanged && (this.variantsContentRef.current.scrollTop = 0)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = event => {
    const isClickedCurrent = () => {
      const ref = this.variantsRef.current

      return ref && ref.contains(event.target)
    }

    !isClickedCurrent() && this.setState({ isOpen: false })
  }

  panelData () {
    const { isOpen } = this.state

    const panelClassName = 'playerPanelTrackVariants' + (isOpen ? ' open' : '')

    return (
      <Ref innerRef={this.variantsRef}>
        <div className={panelClassName}>
          {this.buttonData()}
          {this.contentData()}
        </div>
      </Ref>
    )
  }

  buttonData () {
    const { isOpen } = this.state
    const { currentTrackVariants } = this.props

    const content = `Variants (${currentTrackVariants.length})`
    const icon = `angle ${isOpen ? 'down' : 'up'}`
    const handleButtonClick = () => this.setState({ isOpen: !isOpen })

    return (
      <Button
        compact
        className="playerPanelTrackVariantsButton"
        size="tiny"
        labelPosition="right"
        onClick={handleButtonClick}
        {...{ content, icon }}
      />
    )
  }

  contentData () {
    const { currentTrackVariants } = this.props

    const variantData = variant => {
      const variantProps = { key: uuid(), variant }

      return <VariantContext {...variantProps} />
    }
    const variantsData = currentTrackVariants.map(variantData)

    return (
      <Ref innerRef={this.variantsContentRef}>
        <Segment className="playerPanelTrackVariantsContent">
          <List selection content={variantsData} />
        </Segment>
      </Ref>
    )
  }

  render () {
    const { currentTrackVariants } = this.props

    const panelData = currentTrackVariants && this.panelData()

    return <React.Fragment>{panelData}</React.Fragment>
  }
}

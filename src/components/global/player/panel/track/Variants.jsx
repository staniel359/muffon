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
    const { variants } = this.props

    const isVariantsChanged = variants !== prevProps.variants

    isVariantsChanged && (this.variantsContentRef.current.scrollTop = 0)
  }

  componentWillUnmount () {
    this.props.cancelTrackRequest()

    document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = event => {
    const isClickedCurrent = () => {
      const ref = this.variantsRef.current

      return ref && ref.contains(event.target)
    }

    !isClickedCurrent() && this.setState({ isOpen: false })
  }

  render () {
    const { isOpen } = this.state
    const { variants } = this.props

    const dataClassName = 'playerPanelTrackVariants' + (isOpen ? ' open' : '')

    const buttonText = `Variants (${variants.length})`
    const buttonIcon = isOpen ? 'angle down' : 'angle up'
    const handleButtonClick = () => this.setState({ isOpen: !isOpen })

    const buttonData = (
      <Button
        compact
        className="playerPanelTrackVariantsButton"
        size="tiny"
        labelPosition="right"
        content={buttonText}
        icon={buttonIcon}
        onClick={handleButtonClick}
      />
    )

    const variantData = (variant, index) => {
      const variantProps = { variant, index, key: uuid() }

      return <VariantContext {...variantProps} />
    }
    const variantsData = variants.map(variantData)

    const contentData = (
      <Ref innerRef={this.variantsContentRef}>
        <Segment className="playerPanelTrackVariantsContent">
          <List selection content={variantsData} />
        </Segment>
      </Ref>
    )

    return (
      <Ref innerRef={this.variantsRef}>
        <div className={dataClassName}>
          {buttonData}
          {contentData}
        </div>
      </Ref>
    )
  }
}

/* eslint-disable no-return-assign */
import React, {Component} from 'react'
import Modal from './modal'
import {connect} from 'react-redux'
import {_isDataMissing} from '../../helperfuncs/'

export default class Container extends Component {
  state = {isShown: false}
  showModal = () =>
    this.setState({isShown: true}, () => {
      this.closeButton.focus()
    })

  closeModal = () => this.setState({isShown: false})

  onClickOutside = event => {
    if (this.modal && this.modal.contains(event.target)) return
    this.closeModal()
  }

  componentDidMount() {
    this.showModal()
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isShown ? (
          <Modal
            modalRef={n => (this.modal = n)}
            buttonRef={n => (this.closeButton = n)}
            closeModal={this.closeModal}
            // onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

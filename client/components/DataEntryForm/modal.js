import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Form from './form'
import FocusTrap from 'focus-trap-react'
import {
  _filterTruthyData,
  _sentenceCase,
  _dataValidation
} from '../../helperfuncs/'
import {connect} from 'react-redux'
import {
  updateUser,
  addCodewars,
  addEmail,
  addHackernoon,
  addMedium,
  addStackoverflow,
  fetchCodewars,
  fetchHackernoon,
  fetchMedium,
  fetchStackoverflow
} from '../../store'
import {ToastsStore} from 'react-toasts'

const mapStateToProps = ({signupReducer, userReducer}) => ({
  userId: userReducer.id,
  codewars: signupReducer.codewars,
  email: signupReducer.email,
  hackernoon: signupReducer.hackernoon,
  medium: signupReducer.medium,
  stackoverflow: signupReducer.stackoverflow
})

const mapDispatchToProps = dispatch => ({
  updateUser: (userId, newUserData) =>
    dispatch(updateUser(userId, newUserData)),
  addCodewars: codewars => dispatch(addCodewars(codewars)),
  addEmail: email => dispatch(addEmail(email)),
  addHackernoon: hackernoon => dispatch(addHackernoon(hackernoon)),
  addMedium: medium => dispatch(addMedium(medium)),
  addStackoverflow: stackoverflow => dispatch(addStackoverflow(stackoverflow)),
  fetchCodewars: (userId, codewars) =>
    dispatch(fetchCodewars(userId, codewars)),
  fetchHackernoon: (userId, hackernoon) =>
    dispatch(fetchHackernoon(userId, hackernoon)),
  fetchMedium: (userId, medium) => dispatch(fetchMedium(userId, medium)),
  fetchStackoverflow: (userId, medium) =>
    dispatch(fetchStackoverflow(userId, medium))
})
//! warning if you are going to change your account
export default connect(mapStateToProps, mapDispatchToProps)(
  class Modal extends Component {
    handleChange = evt => this.props[`add${evt.target.name}`](evt.target.value)

    handleSubmit = evt => {
      evt.preventDefault()
      const {
        userId,
        codewars,
        email,
        hackernoon,
        stackoverflow,
        medium,
        updateUser,
        closeModal
      } = this.props

      const truthyData = _filterTruthyData({
        codewars,
        email,
        stackoverflow,
        medium,
        hackernoon
      })

      updateUser(userId, truthyData)

      Object.keys(truthyData).forEach(async category => {
        await this.props[`fetch${_sentenceCase(category)}`](
          userId,
          truthyData[category]
        )
        this.props[`add${_sentenceCase(category)}`]('')
      })
      //!show waiting
      ToastsStore.info('what')
      ToastsStore.success(
        `Added usernames for ${Object.keys(truthyData).join(', ')}!`
      )
      closeModal()
    }
    render() {
      const {
        onClickOutside,
        onKeyDown,
        modalRef,
        buttonRef,
        closeModal,
        codewars,
        email,
        hackernoon,
        stackoverflow,
        medium
      } = this.props
      return ReactDOM.createPortal(
        <FocusTrap>
          <aside
            tag="aside"
            role="dialog"
            tabIndex="-1"
            aria-modal="true"
            className="modal-cover"
            onClick={onClickOutside}
            onKeyDown={onKeyDown}
          >
            <div className="modal-area" ref={modalRef}>
              <button
                ref={buttonRef}
                aria-label="Close Modal"
                aria-labelledby="close-modal"
                className="_modal-close"
                onClick={closeModal}
              >
                <span id="close-modal" className="_hide-visual">
                  Close
                </span>
                <svg className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg>
              </button>
              <div className="modal-body">
                <h3>
                  We want to give you the best experience. Please link your
                  other accounts by providing your username!
                </h3>
                <h5>
                  Please note that changing your username will delete all
                  previous account information.
                </h5>
                <Form
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  valid={_dataValidation(
                    _filterTruthyData({
                      codewars,
                      email,
                      stackoverflow,
                      medium,
                      hackernoon
                    })
                  )}
                />
              </div>
            </div>
          </aside>
        </FocusTrap>,
        document.body
      )
    }
  }
)

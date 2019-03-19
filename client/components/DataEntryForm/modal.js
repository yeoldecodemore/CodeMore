import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Form from './form'
import FocusTrap from 'focus-trap-react'
import {_filterTruthyData, _sentenceCase} from '../../helperfuncs/'
import {connect} from 'react-redux'
import {
  updateUser,
  addCodewars,
  addEmail,
  addHackernoon,
  addMedium,
  addStackoverflow,
  fetchInitialCodewars
} from '../../store'

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
  fetchInitialCodewars: (userId, codewars) =>
    dispatch(fetchInitialCodewars(userId, codewars))
})
//! add a toast here
export default connect(mapStateToProps, mapDispatchToProps)(
  class Modal extends Component {
    handleChange = evt => this.props[`add${evt.target.name}`](evt.target.value)

    handleSubmit = async evt => {
      evt.preventDefault()
      const {
        userId,
        codewars,
        email,
        hackernoon,
        stackoverflow,
        medium,
        updateUser,
        fetchInitialCodewars,
        closeModal
      } = this.props

      const truthyData = _filterTruthyData({
        codewars,
        email,
        hackernoon,
        stackoverflow,
        medium
      })

      updateUser(userId, truthyData) //only update user with truthy data (not empty strings)
      await fetchInitialCodewars(userId, codewars)
      //resetting the form data on store
      _sentenceCase(Object.keys(truthyData)).forEach(val =>
        this.props[`add${val}`]('')
      )
      closeModal()
    }
    render() {
      const {
        onClickOutside,
        onKeyDown,
        modalRef,
        buttonRef,
        closeModal
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
                <Form
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
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

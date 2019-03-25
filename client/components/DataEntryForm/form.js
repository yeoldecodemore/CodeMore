/* eslint-disable complexity */
/* eslint-disable react/display-name */
import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = ({signupReducer, userReducer}) => ({
  codewars: signupReducer.codewars,
  email: signupReducer.email,
  hackernoon: signupReducer.hackernoon,
  medium: signupReducer.medium,
  stackoverflow: signupReducer.stackoverflow,
  userCodewars: userReducer.codewars,
  userEmail: userReducer.email,
  userHackernoon: userReducer.hackernoon,
  userMedium: userReducer.medium,
  userStackoverflow: userReducer.stackoverflow
})

export default connect(mapStateToProps)(
  ({
    handleSubmit,
    handleChange,
    codewars,
    hackernoon,
    medium,
    email,
    stackoverflow,
    userStackoverflow,
    userCodewars,
    userHackernoon,
    userMedium,
    userEmail,
    valid
  }) => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="codewars">Codewars</label>
        <input
          type="text"
          className="form-control"
          name="Codewars"
          id="codewars"
          // disabled={userCodewars}
          value={codewars}
          onChange={handleChange}
          placeholder={userCodewars || '...'}
        />
      </div>
      <div className="form-group">
        <label htmlFor="stackoverflow">Stack Overflow</label>
        {!stackoverflow || (stackoverflow && !isNaN(stackoverflow)) ? null : (
          <div className="form-error">Expecting Numerical Stackoverflow Id</div>
        )}
        <input
          type="text"
          className="form-control"
          name="Stackoverflow"
          id="stackoverflow"
          //disabled={userStackoverflow}
          value={stackoverflow}
          onChange={handleChange}
          placeholder={userStackoverflow || '...'}
        />
      </div>
      <div className="form-group">
        <label htmlFor="medium">Medium</label>
        {!medium || (medium && medium.includes('@')) ? null : (
          <div className="form-error">Include @</div>
        )}
        <input
          type="text"
          className="form-control"
          name="Medium"
          id="medium"
          // disabled={userMedium}
          value={medium}
          onChange={handleChange}
          placeholder={userMedium || '@...'}
        />
      </div>
      <div className="form-group">
        <label htmlFor="hackernoon">Hackernoon</label>
        {!hackernoon || (hackernoon && hackernoon.includes('@')) ? null : (
          <div className="form-error">Include @</div>
        )}
        <input
          type="text"
          className="form-control"
          name="Hackernoon"
          id="hackernoon"
          // disabled={userHackernoon}
          value={hackernoon}
          onChange={handleChange}
          placeholder={userHackernoon || '@...'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        {!email || (email && email.includes('@')) ? null : (
          <div className="form-error">Include @</div>
        )}
        <input
          type="text"
          className="form-control"
          name="Email"
          id="email"
          // disabled={userEmail}
          value={email}
          onChange={handleChange}
          placeholder={userEmail || '...@...'}
        />
      </div>
      <div className="form-group">
        <button
          disabled={!valid}
          className="form-control btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
)

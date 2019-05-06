import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ loggedIn, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      console.log(loggedIn);
      if (loggedIn) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect to={{
            pathname: '/',
            state: {
              from: props.location
            }
          }}
          />
        );
      }
    }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
  }
}

export default connect(mapStateToProps)(ProtectedRoute);
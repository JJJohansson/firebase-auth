import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class LoggedInTab extends Component {
  render() {
    return (
      <div className="bottom-row">
        <Typography component="h4" variant="subtitle1" gutterBottom>
          User: {this.props.user.email}
        </Typography>
        <Button onClick={this.props.handleLogout} color="primary">
          LOG OUT
        </Button>
      </div>
    );
  }
}

export default LoggedInTab;

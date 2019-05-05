import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

class SnackbarNotification extends React.Component {
  state = {
    open: false,
    message: '',
  };

  componentWillReceiveProps(props) {
    if (props.open) this.setState({ open: props.open, message: props.message });
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="email-sent-snackbar">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={5000}
          variant="success"
          message={this.state.message}
          action={[
            <Button key="confirm" color="secondary" size="small" onClick={this.handleClose}>
              OKAY
            </Button>
          ]}
        />
      </div>
    );
  }
}

export default SnackbarNotification;

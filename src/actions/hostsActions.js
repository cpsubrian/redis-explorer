import alt from '../alt';
import db from '../utils/db';

class HostsActions {

  connectToHost (host) {
    this.dispatch(host);

    db.connect(host, (err) => {
      if (err) {
        this.actions.connectToHostFailed();
      }
      else {
        this.actions.connectedToHost();
      }
    });
  }

  connectToHostFailed (err) {
    this.dispatch(err);
  }

  connectedToHost () {
    this.dispatch();
  }

}

export default alt.createActions(HostsActions);
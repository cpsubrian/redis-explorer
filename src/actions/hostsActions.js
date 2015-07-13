import alt from '../alt'
import db from '../utils/db'

class HostsActions {

  /* Connection Lifecycle
   ****************************************************************************/
  connectToHost (host) {
    this.dispatch(host)

    db.connect(host.toJS(), (err) => {
      if (err) {
        this.actions.connectToHostFailed(err)
      } else {
        this.actions.connectedToHost()
      }
    })
  }

  connectToHostFailed (err) {
    this.dispatch(err)
  }

  connectedToHost () {
    this.dispatch()
  }

  /* Fetch Info Lifecycle
   ****************************************************************************/
  fetchHostInfo (isRefresh) {
    this.dispatch(isRefresh)

    db.fetchInfo((err, info) => {
      if (err) {
        this.actions.fetchHostInfoFailed(err)
      } else {
        this.actions.fetchHostInfoFinished(info)
      }
    })
  }

  fetchHostInfoFinished (info) {
    this.dispatch(info)
  }

  fetchHostInfoFailed (err) {
    this.dispatch(err)
  }

}

export default alt.createActions(HostsActions)

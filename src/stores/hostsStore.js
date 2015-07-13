import alt from '../alt'
import path from 'path'
import fs from 'fs'
import _ from 'underscore'
import Immutable from 'immutable'
import immutable from 'alt/utils/ImmutableUtil'
import sshConfig from 'ssh-config'
import hostsActions from '../actions/hostsActions'

@immutable
class HostsStore {

  constructor () {
    // Bind actions.
    this.bindActions(hostsActions)

    // Initialize state.
    this.error = null
    this.connected = false
    this.connecting = false
    this.hostInfoLoading = false
    this.hostInfoError = null
    this.hostInfo = null
    this.hosts = Immutable.List()

    // Load hosts from .ssh.
    let configPath = path.join(
      process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
      '.ssh',
      'config'
    )
    let hostsFile = fs.readFileSync(configPath, 'utf8')
    if (hostsFile && hostsFile.length) {
      let config = sshConfig.parse(hostsFile)

      this.hosts = this.hosts.withMutations((hosts) => {
        _.each(config, (host) => {
          hosts.push(Immutable.Map(host))
        })
      })
    }

    // Alphabetize.
    this.hosts = this.hosts.sortBy((host) => host.get('Host').toLowerCase())

    // Add localhost and set active host.
    this.hosts = this.hosts.unshift(Immutable.Map({
      Host: 'localhost',
      Hostname: 'localhost'
    }))
    this.activeHost = this.hosts.get(0)
  }

  /* Connection Lifecycle
   ****************************************************************************/
  onConnectToHost (host) {
    if ((!this.connected && !this.connecting) || (this.activeHost !== host)) {
      this.activeHost = host
      this.connected = false
      this.connecting = true
      this.hostInfoLoading = false
      this.hostInfoError = null
      this.hostInfo = null
    }
  }

  onConnectToHostFailed (err) {
    this.error = err
    this.connecting = false
  }

  onConnectedToHost () {
    this.connected = true
    this.connecting = false
  }

  /* Fetch Host Info Lifecycle
   ****************************************************************************/
  onFetchHostInfo (isRefresh) {
    if (!isRefresh) {
      this.loadingHostInfo = true
      this.hostInfo = null
    }
    this.hostInfoError = null
  }

  onFetchHostInfoFailed (err) {
    this.hostInfoLoading = false
    this.hostInfoError = err
  }

  onFetchHostInfoFinished (info) {
    this.hostInfoLoading = false
    this.hostInfoError = null
    this.hostInfo = Immutable.Map(info)
  }
}

export default alt.createStore(HostsStore)

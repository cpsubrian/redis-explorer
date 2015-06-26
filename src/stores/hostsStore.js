import alt from '../alt';
import path from 'path';
import fs from 'fs';
import _ from 'underscore';
import sshConfig from 'ssh-config';
import hostsActions from '../actions/hostsActions';

class HostsStore {

  constructor () {
    // Bind actions.
    this.bindActions(hostsActions);

    // Initialize state.
    this.error = null;
    this.connected = false;
    this.connecting = false;
    this.hosts = [];

    // Load hosts from .ssh.
    let configPath = path.join(
      process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
      '.ssh',
      'config'
    );
    let hostsFile = fs.readFileSync(configPath, 'utf8');
    if (hostsFile && hostsFile.length) {
      let config = sshConfig.parse(hostsFile);
      _.each(config, (host) => {
        this.hosts.push(host);
      });
    }

    // Alphabetize.
    this.hosts.sort(function (a, b) {
      let aHost = a.Host.toLowerCase()
        , bHost = b.Host.toLowerCase();

      if (aHost < bHost) return -1;
      if (aHost > bHost) return 1;
      return 0;
    });

    this.hosts.unshift({
      Host: 'localhost',
      Hostname: 'localhost'
    });
    this.activeHost = this.hosts[0];
  }

  onConnectToHost (host) {
    if ((!this.connected && !this.connecting) || (this.activeHost !== host)) {
      this.activeHost = host;
      this.connected = false;
      this.connecting = true;
    }
  }

  onConnectToHostFailed (err) {
    this.error = err;
    this.connecting = false;
  }

  onConnectedToHost () {
    this.connected = true;
    this.connecting = false;
  }
}

export default alt.createStore(HostsStore);
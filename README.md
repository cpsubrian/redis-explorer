RedisExplorer
==============

An [electron](http://electron.atom.io/)-powered GUI for [redis](http://redis.io/).

![screenshot](https://raw.githubusercontent.com/cpsubrian/redis-explorer/master/resources/screenshot.png)

Installation
------------

Currently, I'm only building for Mac OSX, but that may change as the feature-set
becomes more stable.

You'll find all the latest releases [here](https://github.com/cpsubrian/redis-explorer/releases).

Connecting to Remote Hosts
--------------------------

The app currently **only** supports connecting to remote hosts via an ssh tunnel
via your local `ssh-agent` and **no password**. Right now only redis servers
running on the default port can be connected to, but many more configuration
options are on the roadmap.

Available hosts will be parsed from your `~/.ssh/config`, which should contain
entries like:

```
Host myhost
  Hostname [ip address]
  User [username]

Host anotherhost
  Hostname [ip address]
  Port [port]
  User [username]
```

Development
-----------

I would love to add **your** name as a collaborator here :) Please discuss bugs
or new features here on the issues queue before spending time on them, because
I'm working through an internal list of TODOs at the moment and want to avoid
stepping on toes. Once I get the main feature list implemented, I'll maintain
a roadmap and wishlist here in the README so others can contribute more easily.

### How to Build

For development, you'll just need to clone this repo and run `make`.

If you want to build a release, you'll probably need to go edit the config
and include your Apple developer ID, which will need to have been set up
via XCode. How to do that is beyond the scope of this project.


- - -

#### Developed by [TerraEclipse](https://github.com/TerraEclipse)

Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.

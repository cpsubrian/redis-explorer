import React from 'react'
import {Paper} from 'material-ui'

const HostInfo = React.createClass({

  propTypes: {
    hostInfo: React.PropTypes.object
  },

  infoGroups: [
    {
      title: 'Server',
      props: [
        'redis_version',
        'redis_git_sha1',
        'redis_git_dirty',
        'redis_build_id',
        'redis_mode',
        'os',
        'arch_bits',
        'multiplexing_api',
        'gcc_version',
        'process_id',
        // 'run_id',
        'tcp_port',
        'uptime_in_seconds',
        'uptime_in_days',
        'hz',
        'lru_clock',
        'config_file'
      ]
    }, {
      title: 'Clients',
      props: [
        'connected_clients',
        'client_longest_output_list',
        'client_biggest_input_buf',
        'blocked_clients'
      ]
    }, {
      title: 'Memory',
      props: [
        'used_memory',
        'used_memory_human',
        'used_memory_rss',
        'used_memory_peak',
        'used_memory_peak_human',
        'used_memory_lua',
        'mem_fragmentation_ratio',
        'mem_allocator'
      ]
    }, {
      title: 'Persistence',
      props: [
        'loading',
        'rdb_changes_since_last_save',
        'rdb_bgsave_in_progress',
        'rdb_last_save_time',
        'rdb_last_bgsave_status',
        'rdb_last_bgsave_time_sec',
        'rdb_current_bgsave_time_sec',
        'aof_enabled',
        'aof_rewrite_in_progress',
        'aof_rewrite_scheduled',
        'aof_last_rewrite_time_sec',
        'aof_current_rewrite_time_sec',
        'aof_last_bgrewrite_status',
        'aof_last_write_status'
      ]
    }, {
      title: 'Stats',
      props: [
        'total_connections_received',
        'total_commands_processed',
        'instantaneous_ops_per_sec',
        'total_net_input_bytes',
        'total_net_output_bytes',
        'instantaneous_input_kbps',
        'instantaneous_output_kbps',
        'rejected_connections',
        'sync_full',
        'sync_partial_ok',
        'sync_partial_err',
        'expired_keys',
        'evicted_keys',
        'keyspace_hits',
        'keyspace_misses',
        'pubsub_channels',
        'pubsub_patterns',
        'latest_fork_usec'
      ]
    }, {
      title: 'Replication',
      props: [
        'role',
        'connected_slaves',
        'master_repl_offset',
        'repl_backlog_active',
        'repl_backlog_size',
        'repl_backlog_first_byte_offset',
        'repl_backlog_histlen:0'
      ]
    }, {
      title: 'CPU',
      props: [
        'used_cpu_sys',
        'used_cpu_user',
        'used_cpu_sys_children',
        'used_cpu_user_children'
      ]
    }, {
      title: 'Keyspace',
      getInfo () {
        if (this.props.hostInfo.databases) {
          let dbs = []
          for (let i = 0; i <= 16; i++) {
            if (this.props.hostInfo.databases[i]) {
              this.props.hostInfo.databases[i].num = i
              dbs.push(this.props.hostInfo.databases[i])
            }
          }
          return dbs.map((db) => {
            return (
              <table key={'db-' + db.num}>
                <tr>
                  <td className='prop'><strong>db{db.num}</strong></td>
                  <td className='value'></td>
                </tr>
                <tr>
                  <td className='prop'>keys</td>
                  <td className='value'>db.keys</td>
                </tr>
                <tr>
                  <td className='prop'>expires</td>
                  <td className='value'>db.expires</td>
                </tr>
              </table>
            )
          })
        } else {
          return null
        }
      }
    }
  ],

  renderGroup (group) {
    return (
      <Paper key={'group-' + group.title} className='host-info-group'>
        <h3>{group.title}</h3>
        {group.getInfo ?
          group.getInfo.call(this)
        :/*else*/
          <table>
          {group.props.map((prop) => {
            return (
              <tr key={'prop-' + prop}>
                <td className='prop'>{prop}</td>
                <td className='value'>{this.props.hostInfo[prop]}</td>
              </tr>
            )
          })}
          </table>
        }
      </Paper>
    )
  },

  render () {
    return (
      <div className='host-info'>
        {this.infoGroups.map((group) => {
          return this.renderGroup(group)
        })}
      </div>
    )
  }
})

export default HostInfo

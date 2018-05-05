import * as program from 'commander'
import * as net from 'net'
import * as path from 'path'
import { showHost, watch, saveHost } from './actions'
import * as log from './log'

program
  .command('host')
  .description('Show your current host IP')
  .action(() => {
    showHost()
  })

program
  .command('set <hostIP>')
  .description('Set your host IP')
  .action((hostIP: string) => {
    if (!net.isIP(hostIP)) {
      log.error(`${hostIP} is not a valid IP`)
      process.exit(1)
    }

    saveHost(hostIP)
  })

program
  .command('watch [item]')
  .description('Watching change in a directory or file')
  .action((item: string) => {
    const pwd = process.cwd()
    if (!item) {
      item = '.'
    }
    item = path.resolve(pwd, item)

    watch(item)
  })

program.parse(process.argv)

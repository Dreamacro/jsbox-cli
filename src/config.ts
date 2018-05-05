import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import * as fs from 'fs'
import chalk from 'chalk'

import { CONFIG_PATH, CONFIG_DIR } from './constant'

if (!fs.existsSync(CONFIG_DIR)) {
  fs.mkdirSync(CONFIG_DIR)
}

if (!fs.statSync(CONFIG_DIR).isDirectory()) {
  console.log(chalk.red(`[ERROR] ${CONFIG_DIR} is not a directory`))
  process.exit(1)
}

const db = low(new FileSync(CONFIG_PATH))
db.defaults({ host: '' }).write()
export function setHost (host) {
  db.set('host', host).write()
}

export function getHost (): string {
  return db.get('host').value()
}

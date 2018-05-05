import chalk from 'chalk'

export function info (msg: string) {
  console.log(chalk.greenBright(`[INFO] ${msg}`))
}

export function warn (msg: string) {
  console.log(chalk.yellowBright(`[WARN] ${msg}`))
}

export function error (msg: string) {
  console.log(chalk.redBright(`[ERROR] ${msg}`))
}

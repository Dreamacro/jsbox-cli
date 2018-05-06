import { readdirSync, createWriteStream, readFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import * as archiver from 'archiver'
import * as _ from 'lodash'

export function isPackageDir (dir: string) {
  const filesSet = new Set(readdirSync(dir))
  for (const f of ['assets', 'scripts', 'strings', 'config.json', 'main.js']) {
    if (!filesSet.has(f)) {
      return false
    }
  }
  return true
}

export function getPackageName (dir: string) {
  const config = JSON.parse(readFileSync(join(dir, 'config.json')).toString())
  return _.get(config, 'info.name')
}

export function zipFolder (dir: string, path: string): Promise<string> {
  if (!existsSync(dirname(path))) {
    mkdirp(dirname(path))
  }

  const archive = archiver('zip')
  const s = createWriteStream(path)
  for (const d of ['assets', 'scripts', 'strings']) {
    archive.directory(join(dir, d), d)
  }

  for (const f of ['config.json', 'main.js']) {
    archive.file(join(dir, f), { name: f })
  }

  archive.finalize()
  archive.pipe(s)
  return new Promise(r => {
    s.on('close', () => r(path))
  })
}

export function mkdirp (path: string) {
  if (existsSync(path)) {
    return
  }
  const parentDir = dirname(path)
  if (!existsSync(parentDir)) {
    mkdirp(parentDir)
  }
  mkdirSync(path)
}

export async function tryCatch<T> (promise: any): Promise<[T, Error]> {
  try {
    const ret = await promise
    return [ret, null as Error]
  } catch (e) {
    return [null as T, e]
  }
}

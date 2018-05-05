import { readdirSync, createWriteStream } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import * as archiver from 'archiver'

export function isPackageDir (dir: string) {
  const filesSet = new Set(readdirSync(dir))
  for (const f of ['assets', 'scripts', 'strings', 'config.json', 'main.js']) {
    if (!filesSet.has(f)) {
      return false
    }
  }
  return true
}

export function zipFolder (dir: string, dstName: string): Promise<string> {
  const archive = archiver('zip')
  const path = join(tmpdir(), dstName)
  const s = createWriteStream(path)
  archive
    .directory(dir, false)
    .finalize()
  archive.pipe(s)
  return new Promise(r => {
    s.on('close', () => r(path))
  })
}

export async function tryCatch<T> (promise: any): Promise<[T, Error]> {
  try {
    const ret = await promise
    return [ret, null as Error]
  } catch (e) {
    return [null as T, e]
  }
}

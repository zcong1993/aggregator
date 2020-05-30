import * as allsettled from 'promise.allsettled'
import * as debug from 'debug'

const db = debug('aggregator')

export interface Handler<T> {
  fn: () => Promise<T> | T
  fallbackFn?: () => Promise<T> | T
}

export type HandlerTuple<T extends [unknown, ...unknown[]]> = {
  [P in keyof T]: Handler<T[P]>
}
export type ResultTuple<T extends [unknown, ...unknown[]]> = {
  [P in keyof T]: T[P]
}

export function withDefaultValue<T>(value: T) {
  return (): T => value
}

export async function aggregator<T extends [unknown, ...unknown[]]>(
  iterable: HandlerTuple<T>
): Promise<ResultTuple<T>> {
  const resArr = await allsettled(
    iterable.map((it, i) => {
      if (!it.fallbackFn) {
        return it.fn()
      }
      return Promise.resolve(it.fn()).catch((err) => {
        db(`index ${i} call origin fn error: `, err, 'called fallbackFn')
        return it.fallbackFn()
      })
    })
  )
  const res = []
  for (let i = 0; i < resArr.length; i++) {
    const r = resArr[i]
    if (r.status === 'fulfilled') {
      res.push(r.value)
    } else {
      db(`index ${i} cause error, will throw: `, r.reason)
      throw new Error(r.reason as any)
    }
  }
  return (res as any) as Promise<ResultTuple<T>>
}

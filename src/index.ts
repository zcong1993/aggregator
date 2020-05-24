import * as allsettled from 'promise.allsettled'

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
  const resArr = await allsettled(iterable.map((it) => it.fn()))
  const res = []
  for (let i = 0; i < resArr.length; i++) {
    const r = resArr[i]
    if (r.status === 'fulfilled') {
      res.push(r.value)
    } else {
      if (typeof iterable[i].fallbackFn === 'function') {
        res.push(await iterable[i].fallbackFn())
      } else {
        throw new Error(r.reason as any)
      }
    }
  }
  return (res as any) as Promise<ResultTuple<T>>
}

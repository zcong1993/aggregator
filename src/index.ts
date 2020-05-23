import * as allsettled from 'promise.allsettled'

export interface Handler<T> {
  fn: () => Promise<T> | T
  fallbackValue?: T
}

export type HandlerTuple<T extends [unknown, ...unknown[]]> = {
  [P in keyof T]: Handler<T[P]>
}
export type ResultTuple<T extends [unknown, ...unknown[]]> = {
  [P in keyof T]: T[P]
}

export const aggregator = async <T extends [unknown, ...unknown[]]>(
  iterable: HandlerTuple<T>
): Promise<ResultTuple<T>> => {
  return allsettled(iterable.map((it) => it.fn())).then((resArr) => {
    const res = []
    for (let i = 0; i < resArr.length; i++) {
      const r = resArr[i]
      if (r.status === 'fulfilled') {
        res.push(r.value)
      } else {
        if (iterable[i].fallbackValue !== undefined) {
          res.push(iterable[i].fallbackValue)
        } else {
          throw new Error(r.reason as any)
        }
      }
    }
    return res
  }) as Promise<ResultTuple<T>>
}

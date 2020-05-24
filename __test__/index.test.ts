import { aggregator, withDefaultValue } from '../src'

it('should work well', async () => {
  const res = await aggregator([
    {
      fn: () => Promise.resolve(1),
    },
    {
      fn: () => Promise.resolve(2),
    },
    {
      fn: () => 3,
    },
  ])
  expect(res).toEqual([1, 2, 3])
})

it('fallback should work well', async () => {
  const res = await aggregator([
    {
      fn: () => Promise.reject(-1),
      fallbackFn: withDefaultValue(1),
    },
    {
      fn: () => Promise.reject(-2),
      fallbackFn: () => Promise.resolve(3),
    },
  ])
  expect(res).toEqual([1, 3])
})

it('reject without fallback should throw', async () => {
  expect(() =>
    aggregator([
      {
        fn: () => Promise.reject(-1),
      },
    ])
  ).rejects.toThrowError('-1')
})

it('should throw when fallback function fail', async () => {
  expect(() =>
    aggregator([
      {
        fn: () => Promise.reject(-1),
        fallbackFn: async () => {
          throw new Error('-2')
        },
      },
    ])
  ).rejects.toThrowError('-2')
})

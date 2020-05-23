import { aggregator } from '../src'

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
      fallbackValue: 1,
    },
  ])
  expect(res).toEqual([1])
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

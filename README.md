# aggregator

[![NPM version](https://img.shields.io/npm/v/@zcong/aggregator.svg?style=flat)](https://npmjs.com/package/@zcong/aggregator) [![NPM downloads](https://img.shields.io/npm/dm/@zcong/aggregator.svg?style=flat)](https://npmjs.com/package/@zcong/aggregator) [![JS Test](https://github.com/zcong1993/aggregator/actions/workflows/js-test.yml/badge.svg)](https://github.com/zcong1993/aggregator/actions/workflows/js-test.yml) [![codecov](https://codecov.io/gh/zcong1993/aggregator/branch/master/graph/badge.svg)](https://codecov.io/gh/zcong1993/aggregator)

> promise aggregator

## Install

```bash
$ yarn add @zcong/aggregator
# or npm
$ npm i @zcong/aggregator --save
```

## Usage

```ts
import { aggregator, withDefaultValue } from '@zcong/aggregator'

// call multi API concurrency
aggregator([
  {
    fn: () => callImportantAPI(), // will throw when callImportantAPI fail
  },
  {
    fn: () => callOptionalAPI(), // will return fallbackFn when callOptionalAPI fail
    fallbackFn: withDefaultValue({ defaultData: 'defaultData' }),
  },
  {
    fn: () => callOptionalAPI2(),
    fallbackFn: () => callFallbackAPI(), // not use static value
  },
]).then(([importantResp, optionalResp]) => {})
```

## License

MIT &copy; zcong1993

# aggregator

[![NPM version](https://img.shields.io/npm/v/@zcong/aggregator.svg?style=flat)](https://npmjs.com/package/@zcong/aggregator) [![NPM downloads](https://img.shields.io/npm/dm/@zcong/aggregator.svg?style=flat)](https://npmjs.com/package/@zcong/aggregator) [![CircleCI](https://circleci.com/gh/zcong1993/aggregator/tree/master.svg?style=shield)](https://circleci.com/gh/zcong1993/aggregator/tree/master) [![codecov](https://codecov.io/gh/zcong1993/aggregator/branch/master/graph/badge.svg)](https://codecov.io/gh/zcong1993/aggregator)

> promise aggregator

## Install

```bash
$ yarn add @zcong/aggregator
# or npm
$ npm i @zcong/aggregator --save
```

## Usage

```ts
import { aggregator } from '@zcong/aggregator'

// call multi API concurrency
aggregator([
  {
    fn: () => callImportantAPI(), // will throw when callImportantAPI fail
  },
  {
    fn: () => callOptionalAPI(), // will return fallbackValue when callOptionalAPI fail
    fallbackValue: { defaultData: 'defaultData' },
  },
]).then(([importantResp, optionalResp]) => {})
```

## License

MIT &copy; zcong1993

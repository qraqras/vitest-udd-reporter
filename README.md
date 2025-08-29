# vitest-udd-reporter
A small Vitest reporter for Unicorn-Driven Development (UDD).

## Installation
```shell
npm i -D vitest-udd-reporter
```

## Usage
```js
// vite.config.ts
import VitestUddReporter from 'vitest-udd-reporter'

export default {
    test: {
        reporters: ['default', new VitestUddReporter()],
    },
}
```

## Options

### `useBanner`

- Type: `boolean`
- Default: `true`

```js
import VitestUddReporter from 'vitest-udd-reporter'

export default {
    test: {
        reporters: ['default', new VitestUddReporter({ useBanner: false })],
    },
}
```

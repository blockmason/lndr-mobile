# Code Standards

- keep code in appropriate packages under `packages/<package>`
- discuss with team before adding a new package
- no hardcoded text in the app, belongs in `packages/language/<language>`
- no style outside of `packages/theme/default` (we may add themes later)
- for the most part, files should be called `index.js` with any dependencies in `./lib/<function-name>.js`
- all snake-case directory names and file names, leads to less issues
- run `yarn lint` from time to time, especially before committing code
- code under ui should generally begin with `import React, { Component } from 'react' // eslint-disable-line no-unused-vars` to avoid linter errors for `React`
- ui components look like `export default class ComponentName extends Component`

# Packages

Note, to import from a package see `.babelrc` for package name rewrites. *Important:* no relative imports starting with `../` - in other words never assume what's above you in the file tree - you must be able to move folders around without consequence.

- `credit-protocol` contains the client library to connect to BlockMason's credit-protocol server.

  - i.e. `import { CreditProtocolClient } from 'credit-protocol'`

- `language` contains all text strings and functions used to generate text.

  - i.e. `import { helloWorld } from 'language'`

- `lndr/default` is the core application logic and should have *zero* references to `react` or any other ui.

  - i.e. `import LNDR from 'lndr'`

- `theme/default` contains all stylesheets.

  - i.e. `import style from 'theme/button'`

- `ui/default` is the `react-native` user interface.

  - i.e. `import App from 'ui/app'`

# Running

## ... on iOS

- `yarn`
- `react-native link` (note it may hang on `rnpm-install info Assets have been successfully linked to your project` - it's ok to kill it then)
- `react-native run-ios`
- _(optionally)_ kill the spawned terminal and run packager manually: `yarn start`

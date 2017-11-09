_*Note:* this file is over 50 lines long because it contains a lot of relevant information in one place._

# Code Standards

- all code is in TypeScript, using `.tsx` for files containing jsx, or `.ts` for those without
- no semicolons
- 2 spaces
- newline at end of file (check your editor settings)
- trim whitespace on save (check your editor settings)
- keep code in appropriate packages under `packages/<package>`
- discuss with team before adding a new package
- only use third-party libraries when absolutely required
- no hardcoded text in the app, belongs in `packages/language/<language>`
- no style outside of `packages/theme/default` (we may add themes later)
- for the most part, files should be called `index.ts` with any dependencies in `./lib/<function-name>.ts`
- all snake-case directory names and file names, leads to less issues
- code under ui should generally begin with `import React, { Component } from 'react'` to avoid linter errors for `React`
- ui components generally look like `export default class ComponentName extends Component<Props, State>`
- no files over 50 lines long without an explanation at the top

# Packages

*Note:* to import from a package see `.babelrc` and `tsconfig.json` for package name rewrites. *Important:* no relative imports starting with `../` - in other words never assume what's above you in the file tree - you must be able to move folders around without consequence.

*Note:* TypeScript code is compiled into `lib` top level directory.

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
- (only need to do this once or if native dependencies change) `react-native link` (note it may hang on `rnpm-install info Assets have been successfully linked to your project` - it's ok to kill it then)
- `react-native run-ios`
- _(optionally)_ kill the spawned terminal and run packager manually: `yarn start`
- (in new terminal) `yarn run typescript`


## ... on Android

See iOS for initialisation

Setting up ANDROID_HOME env variable

`export ANDROID_HOME=/<SDK installation location>`
`export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools`
`source ~/.bash_profile`

<installation location> will be found in android studio (if installed) in Preferences -> Appearance & Behaviour -> System Settings -> Android SDK

Running Android  

- `react-native run-android`


## ... Logging apps

*In new tabs*

- `react-native log-ios`
- `react-native log-android`

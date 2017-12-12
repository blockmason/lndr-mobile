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
- Fill in the `.env.example` with the proper information and save as `.env`.
- `yarn run setup:env`
- (in new terminal) `yarn run typescript`
- (only need to do this once or if native dependencies change) `react-native link` (note it may hang on `rnpm-install info Assets have been successfully linked to your project` - it's ok to kill it then)
- `react-native run-ios`

## ... on Android

See iOS for initialisation

Setting up ANDROID_HOME env variable

`export ANDROID_HOME=/<SDK installation location>`
`export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools`
`source ~/.bash_profile`

<installation location> will be found in android studio (if installed) in Preferences -> Appearance & Behaviour -> System Settings -> Android SDK

- Fill in the `.env.example` with the proper information and save as `.env`.
- `yarn run setup:env`

Running Android

- Run `react-native run-android`


## ... Logging apps

*In new tabs*

- `react-native log-ios`
- `react-native log-android`

## Building Android APK for Testing
- in separate terminal sessions, run `yarn start` and `yarn run typescript`
- ```react-native run-android```
- ```react-native bundle --dev false --platform android --entry-file index.android.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug```
- ```cd android```
- ```./gradlew assembleDebug```

## Building & Signing Android APK for Google Play

1. Get the gradle.properties file with the keystore passwords and put it in the 'android' directory.

2. Get the blockmason-lndr-android.keystore file and put it in the 'android/app' directory.

3. Run 'cd android && ./gradlew assembleRelease' from the top-level directory.

4. The signed APK will be at 'android/app/build/outputs/apk/app-release.apk'

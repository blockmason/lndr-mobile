watchman watch-del-all && rm -rf node_modules/ && rm -rf ios/build/ && rm -rf lib/ && yarn cache clean && yarn install && yarn start -- --reset-cache

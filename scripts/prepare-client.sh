export NODE_OPTIONS=--openssl-legacy-provider && cd ../client && yarn && yarn build --prod && mv build ../server/build && cd ..

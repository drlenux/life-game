# Life game

[Run online](https://drlenux.github.io/life-game/)

### build
```bash
npm run build
```

### Change version
Edit file `webpack.config.js` 
```js

module.exports = {
    mode: 'development',
    entry: './v1/index.ts',
    devtool: 'inline-source-map',
    //...

```

to

```js

module.exports = {
    mode: 'development',
    entry: './v2/index.ts',
    devtool: 'inline-source-map',
    //...

```

### P.S.
Version `v2` is not working

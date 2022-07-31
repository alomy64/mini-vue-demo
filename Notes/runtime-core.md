> 命令 rollup

```js
yarn add rollup --dev
yarn add  @rollup/plugin-typescript --dev
yarn add tslib --dev

// 打包
yarn build
yarn build --watch
```

> rollup.config.js

```js
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    { format: "cjs", file: pkg.main },
    { format: "es", file: pkg.module },
  ],
  plugins: [typescript()],
};
```

> ts.config.json

```json
{
	// 解决控制台警告: (!) Plugin typescript: @rollup/plugin-typescript: Rollup requires that TypeScript produces ES Modules.
  "module": "ESNext",
}
```

> package.json

```json
{
  "main": "lib/mini-vue3.cjs.js",
  "module": "lib/mini-vue3.esm.js",
  "scripts": {
    "build": "rollup -c rollup.config.js"
  },
}
```

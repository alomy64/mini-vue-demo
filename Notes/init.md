  

# 03-24

> 命令

```js
npm init -y
npx tsc --init
yarn add typescript --dev
yarn add jest @types/jest --dev
yarn add --dev babel-jest @babel/core @babel/preset-env
yarn add --dev @babel/preset-typescript
// husky
npm install husky --save-dev
npx husky install
npx husky add .husky/commit-msg
```

> tsconfig.json

```json
"types": ["jest"],
"noImplicitAny": false, // 允许 any 类型 
```

> package.json

```json
"scripts": {
   "test": "jest"
 },
```

> babel.config.js

```js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
```

> .husky/commit-msg

```js
undefined => node scripts/verifyCommit.js
```
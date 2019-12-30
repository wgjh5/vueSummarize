````js
  Error: Missing binding G:\vuesystem\vue-elemadmin\node_modules\node-sass\vendor\win32-x64-64\binding.node
Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 10.x

Found bindings for the following environments:
  - Windows 64-bit with Node.js 8.x

This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass` to download the binding for your current environment.
    at module.exports (G:\vuesystem\vue-elemadmin\node_modules\node-sass\lib\binding.js:15:13)
    at Object.<anonymous> (G:\vuesystem\vue-elemadmin\node_modules\node-sass\lib\index.js:14:35)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:22:18)
    at Object.sassLoader (G:\vuesystem\vue-elemadmin\node_modules\sass-loader\lib\loader.js:24:22)
````

在项目中执行一下命令，即可完美解决！

````bash
npm rebuild node-sass
````


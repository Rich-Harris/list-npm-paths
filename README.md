# list-npm-paths

Say you're using npm to manage your project's dependencies, but you're using RequireJS to structure the project itself. It would be useful to get an object linking module names to source files. That's what this package does.


## Installation

```bash
npm i -D list-npm-paths   # i is short for install, -D for --save-dev
```

## Usage

```js
var lnp = require( 'list-npm-paths' ).sync;  // note the `.sync` (see below).
var paths = lnp();
```

This will return an object mapping module names to file paths. Suppose your `package.json` had the following `dependencies`:

```js
{
  "dependencies": {
    "lodash": "^2.4.1",
    "ractive": "^0.5.7"
  }
}
```

Calling `lnp()` will find the nearest `package.json` to the current working directory, parse out the `dependencies`, and locate the relevant files:

```js
lnp();
// { lodash: 'lodash/dist/lodash', ractive: 'ractive/ractive' }
```

It does this by reading the `main` property of each module's `package.json`, falling back to `index.js`. Modules are assumed to be in a `node_modules` folder that is a sibling of `package.json`.


## Options

```js
lnp({
  // override cwd (defaults to `process.cwd()`). This determines
  // where to look for the package.json file
  cwd: __dirname,

  // return absolute paths, rather than relative to node_modules.
  // Defaults to false
  absolute: true,

  // include .js extension. Defaults to false
  ext: true
});
```


## Example with RequireJS

```js
var requirejs = require( 'requirejs' );
var lnp = require( list-npm-paths' ).sync;

requirejs.optimize({
	name: 'main',
	out: 'main.js',
	paths: lnp()
});
```


## Sync vs async

Right now, list-bower-paths only has a synchronous mode. I don't really see a need for an async mode, but would happily take a pull request if you feel strongly about it.


## License

MIT.

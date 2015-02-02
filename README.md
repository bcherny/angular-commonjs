## The problem

Angular has its own DI system, which has some serious drawbacks:

1. Files need to be concatenated with a build process
2. Declaring a service as a dependency does not guarantee that the service will be available (for example, if you forgot to add the service's file to your HTML page)
3. The injection syntax is awkward, and tries to imitate [guice](https://github.com/google/guice)'s semantics rather than use popular existing solution (CommonJS, AMD, ES6 modules)
4. Because the DI system is so new and has such narrow applications (Angular apps only), there is very little infrastructure built around it. For example, Browserify has a sizable ecosystem of [plugins](https://github.com/substack/node-browserify/wiki/list-of-transforms) and tools for [visualizing dependencies](https://github.com/pahen/madge)
5. It is difficult to figure out which components are not used in an application, so you often end up loading unused dependencies on your page. In contrast, Browserify only bundles modules that are explicitly required by parent modules; combined with JShint's `unused` flag, it's trivial to find and prune out unused dependencies.
6. The DI system doesn't allow for lazy loading module components; all components (services, providers, values, etc.) must be present when the module requiring them is executed

## What does this look like?

By default, Angular DI looks like this:

```js
angular
  .module('foo', [])
  .service('foo', ['bar', 'baz', function (bar, baz) {
    bar.doSomething()
    baz.doSomethingElse()
  }])
```

If we use [ng-annotate](https://github.com/olov/ng-annotate), we can remove our dependency annotations and DRY up our code a bit:

```js
angular
  .module('foo', [])
  .service('foo', function (bar, baz) {
    bar.doSomething()
    baz.doSomethingElse()
  })
```

However, if we start using Browserify, our code gets a bit misleading. Since registering a component with Angular registers it globally, requiring a component does not actually return a value (as is good practice in CommonJS), but rather registers it with Angular, allowing it to be injected. So there is still no direct link in our code between the component being required and the component being injected by Angular.

So a naive Browserify + Angular implementation simply replaces the concatenation part of a build process. This is a good first step. It enables us to:

1. Do some degree of static analysis and dependency visualization
2. Lazy load components (if we use a more sophisticated CommonJS bundler than Browserify, like [webpack](https://github.com/webpack/webpack))
3. Use browserify plugins

Our code might now look like this:

```js
require('./bar')
require('./baz')

angular
  .module('foo', [])
  .service('foo', function (bar, baz) {
    bar.doSomething()
    baz.doSomethingElse()
  })
```

## TODO

- are modules lazy executed? what about commonjs?
- investigate lazy loading angular conponents
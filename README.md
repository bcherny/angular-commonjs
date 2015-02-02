## The problem

Angular has its own Dependency Injection system, which has some serious drawbacks:

1. Files need to be concatenated with a build process
2. Declaring a service as a dependency does not guarantee that the service will be available (for example, if you forgot to add the service's file to your HTML page)
3. The injection syntax is awkward, and tries to imitate [guice](https://github.com/google/guice)'s semantics rather than use popular existing solution (CommonJS, AMD, ES6 modules)
4. Because the DI system is so new and has such narrow applications (Angular apps only), there is very little infrastructure built around it. For example, CommonJS has a sizable ecosystem of [plugins](https://github.com/substack/node-browserify/wiki/list-of-transforms) and tools for [visualizing dependencies](https://github.com/pahen/madge)
5. It is difficult to figure out which components are not used in an application, so you often end up loading unused dependencies on your page. This problem only gets worse and worse as your application gets larger and more mature. In contrast, Browserify only bundles modules that are explicitly required by parent modules; combined with JShint's `unused` flag, it's trivial to find and prune out unused dependencies
6. The DI system doesn't allow for lazy loading module components. All components (services, providers, values, etc.) must be present when the module requiring them is executed
7. Order of dependencies matters. In the first example below, you can't define `bar` before you register the module `foo` (unless you do some finagling like [this](https://gist.github.com/bcherny/b3a2450afc5021ad11a5))

## What does this look like?

By default, Angular DI looks like this:

```js
// contents of foo.js:
angular
  .module('foo', [])
  .service('foo', ['bar', 'baz', function (bar, baz) {
    bar.doSomething()
    baz.doSomethingElse()
  }])

// contents of bar.js:
angular
  .module('foo')
  .service('bar', function(){
    return { doSomething: function(){} }
  })

// contents of baz.js:
angular
  .module('foo')
  .service('baz', function(){
    return { doSomethingElse: function(){} }
  })
```

If we use [ng-annotate](https://github.com/olov/ng-annotate), we can remove our dependency annotations and DRY up our code a bit:

```js
// contents of foo.js:
angular
  .module('foo', [])
  .service('foo', function (bar, baz) {
    bar.doSomething()
    baz.doSomethingElse()
  })

// (contents of bar.js and baz.js are the same as the first example)
```

However, if we start using Browserify, our code gets a bit misleading. Since registering a component with Angular registers it globally, requiring a component does not actually return a value (as is good practice in CommonJS), but rather registers it with Angular, allowing it to be injected. So there is still no direct link in our code between the component being required and the component being injected by Angular.

So a naive Browserify + Angular implementation simply replaces the concatenation part of a build process. This is a good first step. It enables us to:

1. Do some degree of static analysis and dependency visualization
2. Lazy load components (if we use a more sophisticated CommonJS bundler than Browserify, like [webpack](https://github.com/webpack/webpack))
3. Use browserify plugins

Our code might now look like this:

```js
// contents of bar.js:
module.exports = function(){
  return { doSomething: function(){} }
}

// contents of baz.js:
module.exports = function(){
  return { doSomethingElse: function(){} }
}

// contents of foo.js:
angular
  .module('foo', [])
  .service('bar', require('./bar'))
  .service('baz', require('./baz'))
  .service('foo', function (bar, baz) {
    bar.doSomething()
    baz.doSomethingElse()
  })
```

I don't like this approach because of the lack of a clear link between "bar" from `require('./bar')` and "bar" from `function (bar, baz)`. We're also not leveraging CommonJS, but rather Browserify. What if we avoid Angular DI entirely?

```js
// contents of bar.js:
module.exports = {
  doSomething: function(){}
}

// contents of baz.js:
module.exports = {
  doSomethingElse: function(){}
}

// contents of foo.js:
var bar = require('./bar'),
    baz = require('./baz')

angular
  .module('foo', [])
  .service('foo', function () {
    bar.doSomething()
    baz.doSomethingElse()
  })
```

Now we're getting somewhere. We're using both Browserify and CommonJS properly, and have written clean, DRY code. But there is an issue with this approach. A major benefit of Angular's DI is that it makes mocking out dependencies during tests easy. But with this approach, how do we mock bar.js when we're testing foo.js?

...

## TODO

- are modules lazy executed? what about commonjs?
- investigate lazy loading angular conponents
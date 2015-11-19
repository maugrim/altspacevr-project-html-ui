# Space Directory

This tool is a lightweight web interface for browsing and editing available spaces.

## Installing

Packaging and dependencies are managed by [npm][npm]. To install everything:

```
$ cd src
$ npm install
```

## Running

The codebase is built into a Javascript bundle via [webpack][]. You can run [webpack-dev-server][] (included) to try it out:

```
$ npm run dev
```

Once it's running, head to [http://localhost:8080](http://localhost:8080) to see it in action.

## Tests

No automated tests yet, oops! At least there's [eslint][]:

```
$ npm run lint
```

[npm]: https://www.npmjs.com/
[webpack]: https://webpack.github.io/
[webpack-dev-server]: https://webpack.github.io/docs/webpack-dev-server.html
[eslint]: http://eslint.org/

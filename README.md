Recipes! (w/ Flux)
==================

[![Build Status][trav_img]][trav_site]
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/seattlejs/seattlejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Server

### Dev Mode

Install, setup.

```
$ npm install
```

**Option 1** Run the watchers, dev and source maps servers

```
$ gulp dev
```

URLS to test things out:

* `http://127.0.0.1:3000/`: Server-side bootstrap, JS takes over.

**Option 2** To use the webpack hot reload for React and SASS

````
$ gulp hot
````

URLS to test things out:

* `http://127.0.0.1:3001/`: Runs the hotreload server side by side with api server

### Production

Install, setup.

```
$ npm install --production
$ npm run-script build
```

Run the server.

```
$ NODE_ENV=production node server/index.js
```

[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/recipes-flux.svg
[trav_site]: https://travis-ci.org/FormidableLabs/recipes-flux
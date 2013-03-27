butchershop
===========

**Butcher your next {frustrating technology stack} project**

Butchershop is a workbench of sorts that leverages the [hapi.js](https://github.com/spumko/hapi/) 
module to help you develop front-end code using local assets with a remote server.  Basically a 
reverse-proxy site where you can "chop" in assets that need development.  

Ideally, you have access to the code-base but it requires a difficult environment or heavy SDK (say 
goodbye to slow Virtual Machines and/or bloated IDEs) that are unnecessary for static assets such as 
CSS, Images, or JavaScript.  You can edit locally (helpful for pre-compiled css or coffee-script 
which can be watched for changes, compiled and previewed on-the-fly) and still use your 
application's data routes or dynamic pages.

**Full disclosure**
Lets get real for a second.  This project was developed out of a ton of frustration working with 
front-end, static assets coupled too tightly with a .NET project and my ever-growing hatred for 
Microsoft Visual Studio.

### Install

```bash
npm install butchershop --save-dev
```

### Use
You can create a new butcherhop and chop entire directories(shown below) or specific files (see the examles/example.js)

Included in ./examples is, well... an example and can be run by `cd ./example; node example.js`.  Below is a bare-bones implementation: 

```js
// require and set-up the server object.
var Butchershop = require('../index.js');
var butcher = new Butchershop({
    proxy: { host: 'npmjs.org' }
});

// chop any calls to '/stylus/*' to route to a local directory that mimics the same path
butcher.chop('/stylus/{path*}', './stylus-local');
butcher.start();
```

The example included shows how to butcher the [npmjs.org](http://npmjs.org) site and intercept the 
stylesheets.  When you run the example you can expect to see the results below when visiting 
[localhost:8000/package/butchershop](http://localhost:8000/package/butchershop)  

![./examples/example.js result](https://raw.github.com/ruzz311/butchershop/master/examples/butchershop.gif)

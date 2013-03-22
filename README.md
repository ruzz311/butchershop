butchershop
===========

**Butcher your next {frustrating technology stack} project**

Butchershop is a workbench of sorts that leverages hapijs module to help you develop front-end code 
using local assets with a remote server.  Basically a reverse-proxy site where you can "chop" in 
assets that need development.  This project was developed out of a ton of frustration working with a 
team who's static assets were coupled too tightly with a .NET project and my ever-growing hatred for 
Visual Studio.

Ideally, you have access to the code-base but it requires a difficult environment or heavy SDK (say 
goodbye to slow Virtual Machines and/or bloated IDEs) that are unnecessary for static assets such as 
CSS, Images, or JavaScript.  You can edit locally (helpful for pre-compiled css or coffee which can 
be watched locally for changes and compiled) and still use your application's data routes or dynamic
pages.

### Example

```bash
cd examples
node examples.js
```

The example included shows how to butcher the [npmjs.org](http://npmjs.org) site and intercept the 
stylesheets.  When you run the example you can expect to see the results below when visiting 
[localhost:8000/package/butchershop](http://localhost:8000/package/butchershop)  

![./examples/example.js result](https://raw.github.com/ruzz311/butchershop/master/examples/butchershop.gif)

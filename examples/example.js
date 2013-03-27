var Butchershop = require('../index.js');

// the "local" sub-object can be omitted with the same result.
var butcher = new Butchershop({
    local: {
        host        : 'localhost',
        port        : 8000
    },
    proxy: {
        protocol    : 'http',
        host        : 'npmjs.org',
        port        : 80
    }
});

// chop any calls to '/stylus/*' to be routed to a local directory
butcher.chop('/stylus/{path*}', './stylus-local');

// Chop a specific file
//butcher.chop('/static/npm.png', './butchershop.gif');

butcher.start();

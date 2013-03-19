var Butchershop, Hapi;

Hapi = require('hapi');

module.exports = Butchershop = (function() {

  Butchershop.name = 'Butchershop';

  function Butchershop(opt) {
    var _base, _base1, _base2, _base3, _base4;
    if (opt == null) {
      opt = {};
    }
    if (opt.local == null) {
      opt.local = {};
    }
    if ((_base = opt.local).host == null) {
      _base.host = 'localhost';
    }
    if ((_base1 = opt.local).port == null) {
      _base1.port = 8000;
    }
    if (opt.proxy == null) {
      opt.proxy = {};
    }
    if ((_base2 = opt.proxy).protocol == null) {
      _base2.protocol = 'http';
    }
    if ((_base3 = opt.proxy).host == null) {
      _base3.host = 'google.com';
    }
    if ((_base4 = opt.proxy).port == null) {
      _base4.port = 80;
    }
    if (opt.methods == null) {
      opt.methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
    }
    this.options = opt;
    this.server = Hapi.createServer(opt.local.host, opt.local.port, {});
    this.server.on('log', function(event, tags) {
      if (tags.error) {
        return console.log("Server error: " + event.data);
      }
    });
    this.server.on('internalError', function(req, err) {
      return console.log("Error (500) for request " + req.id + ": " + err.message);
    });
  }

  Butchershop.prototype.carcass = function(method) {
    return {
      method: method,
      path: '/{path*}',
      handler: {
        proxy: this.options.proxy
      }
    };
  };

  Butchershop.prototype.chop = function(serverPath, localPath, options) {
    if (options == null) {
      options = {};
    }
    if (options.method == null) {
      options.method = 'GET';
    }
    return this.server.route({
      method: options.method,
      path: serverPath,
      handler: {
        directory: {
          path: localPath,
          listing: false
        }
      }
    });
  };

  Butchershop.prototype.start = function() {
    var method, _i, _len, _ref,
      _this = this;
    _ref = this.options.methods;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      method = _ref[_i];
      this.server.route(this.carcass(method));
    }
    return this.server.start(function() {
      return console.log("" + _this.server.settings.host + ":" + _this.server.settings.port + " started!");
    });
  };

  return Butchershop;

})();

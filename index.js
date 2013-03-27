(function() {
  var Butchershop, Hapi;

  Hapi = require('hapi');

  module.exports = Butchershop = (function() {
    function Butchershop(opt) {
      var _base, _base1, _base2, _base3, _base4, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;

      if (opt == null) {
        opt = {};
      }
      if ((_ref = opt.local) == null) {
        opt.local = {};
      }
      if ((_ref1 = (_base = opt.local).host) == null) {
        _base.host = 'localhost';
      }
      if ((_ref2 = (_base1 = opt.local).port) == null) {
        _base1.port = 8000;
      }
      if ((_ref3 = opt.proxy) == null) {
        opt.proxy = {};
      }
      if ((_ref4 = (_base2 = opt.proxy).protocol) == null) {
        _base2.protocol = 'http';
      }
      if ((_ref5 = (_base3 = opt.proxy).host) == null) {
        _base3.host = 'npmjs.org';
      }
      if ((_ref6 = (_base4 = opt.proxy).port) == null) {
        _base4.port = 80;
      }
      if ((_ref7 = opt.methods) == null) {
        opt.methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
      }
      if ((_ref8 = opt.relativeTo) == null) {
        opt.relativeTo = 'cwd';
      }
      this.options = opt;
      this.server = Hapi.createServer(opt.local.host, opt.local.port, {
        files: {
          relativeTo: opt.relativeTo
        }
      });
      this.server.on('log', function(event, tags) {
        if (tags.error) {
          return console.log("Server error: " + event.data);
        }
      });
      this.server.on('internalError', function(req, err) {
        return console.log("Error (500) for request " + req.id + ": " + err.message);
      });
    }

    Butchershop.prototype.isFile = function(str) {
      var extension, result;

      result = false;
      extension = str.split('.').pop();
      if (str.indexOf('.') !== -1) {
        if (extension.indexOf('/') === -1) {
          result = true;
        }
      }
      return result;
    };

    Butchershop.prototype.carcass = function(method, path) {
      return {
        method: method,
        path: path || '/{path*}',
        handler: {
          proxy: this.options.proxy
        }
      };
    };

    Butchershop.prototype.chop = function(serverPath, localPath, options) {
      var handler, _ref;

      if (options == null) {
        options = {};
      }
      if ((_ref = options.method) == null) {
        options.method = 'GET';
      }
      handler = {};
      if (this.isFile(localPath)) {
        handler = {
          file: localPath
        };
      } else {
        handler = {
          directory: {
            path: localPath,
            listing: false
          }
        };
      }
      return this.server.route({
        method: options.method,
        path: serverPath,
        handler: handler
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

}).call(this);

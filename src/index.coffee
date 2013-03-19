Hapi    = require 'hapi'

module.exports = class Butchershop
    
    constructor : (opt)->
        opt                 ?= {}
        opt.local           ?= {}
        opt.local.host      ?= 'localhost'
        opt.local.port      ?= 8000
        opt.proxy           ?= {}
        opt.proxy.protocol  ?= 'http'
        opt.proxy.host      ?= 'google.com'
        opt.proxy.port      ?= 80
        opt.methods         ?= [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ]
        @options            = opt
        
        # Create hapi server
        @server = Hapi.createServer opt.local.host, opt.local.port, {}
        
        # Simple Error Logging
        @server.on 'log', (event, tags)->
            console.log "Server error: #{event.data}" if tags.error
            
        @server.on 'internalError', (req, err)-> 
            console.log "Error (500) for request #{req.id}: #{err.message}" 
    
    #
    # Attach General Proxy Route Methods
    # 
    carcass : (method)->
        method  : method
        path    : '/{path*}'
        handler : 
            proxy: @options.proxy
    
    #
    # Attach Workbench Routes
    #
    chop : (serverPath, localPath, options)->
        options         ?= {}
        options.method  ?= 'GET'
        @server.route
            method  : options.method
            path    : serverPath
            handler : 
                directory: 
                    path    : localPath
                    listing : false
    
    #
    # Start the workbench
    #
    start : ()->
        for method in @options.methods
            @server.route( @carcass(method) )
        
        @server.start ()=> 
            console.log "#{@server.settings.host}:#{@server.settings.port} started!"
    
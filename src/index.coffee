Hapi    = require 'hapi'

module.exports = class Butchershop
    
    constructor : (opt)->
        opt                 ?= {}
        opt.local           ?= {}
        opt.local.host      ?= 'localhost'
        opt.local.port      ?= 8000
        opt.proxy           ?= {}
        opt.proxy.protocol  ?= 'http'
        opt.proxy.host      ?= 'npmjs.org'
        opt.proxy.port      ?= 80
        opt.methods         ?= [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ]
        opt.relativeTo      ?= 'cwd'
        @options            = opt
        
        # Create hapi server
        @server = Hapi.createServer opt.local.host, opt.local.port, 
            files: 
                relativeTo: opt.relativeTo
        
        # Simple Error Logging
        @server.on 'log', (event, tags)->
            console.log "Server error: #{event.data}" if tags.error
            
        @server.on 'internalError', (req, err)-> 
            console.log "Error (500) for request #{req.id}: #{err.message}" 
    
    #
    # Utility to check if route is a file or a directory
    #
    isFile : (str)->
        result      = false
        extension   = str.split('.').pop()
        
        if str.indexOf('.') isnt -1
            result = true if extension.indexOf('/') is -1
        
        result
    
    #
    # Attach General Proxy Route Methods
    # 
    carcass : (method, path)->
        method  : method
        path    : path or '/{path*}'
        handler : 
            proxy : @options.proxy
    
    #
    # Attach Workbench Routes
    #
    chop : (serverPath, localPath, options)->
        options        ?= {}
        options.method ?= 'GET'
        handler         = {}
        
        if @isFile(localPath)
            handler = { file: localPath }
        else
            handler =  
                directory : 
                    path    : localPath
                    listing : false
        
        @server.route 
            method  : options.method
            path    : serverPath
            handler : handler
    #
    # Start the workbench
    #
    start : ()->
        for method in @options.methods
            @server.route( @carcass(method) )
        
        @server.start ()=> 
            console.log "#{@server.settings.host}:#{@server.settings.port} started!"
    
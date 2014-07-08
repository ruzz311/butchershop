mocha       = require 'mocha'
should      = require 'should'
#inspect     = (require 'util').inspect
Butchershop = require '../index'

describe 'Butchershop', ->

    describe 'constructor', ->

        it 'should not require any user config', ->
            new Butchershop().should.be.ok
        
        it 'should set default local-server properties', ->
            butcher = new Butchershop()
            local   = butcher.options.local

            local.host.should.equal 'localhost'
            local.port.should.equal 8000

        it 'should set default proxy properties', ->
            butcher = new Butchershop()
            proxy = butcher.options.proxy

            proxy.protocol.should.equal 'https'
            proxy.host.should.equal 'www.npmjs.org'
            proxy.port.should.equal 443

    describe 'isFile', ->
        
        butcher = new Butchershop()

        path    = 
            dirs : [
                ''
                '/'
                'dir'
                '/dir'
                '/dir/'
                '/dir.name/name/'
            ]
            
            files : [
                '/file.html'
                '/file.name.html'
                '/dir/file.html'
                '/dir/file.name.html'
                '/dir.name/name.html'
            ]
        
        for dir in path.dirs
            it "should detect that '#{ dir }' is a directory", ->
                butcher.isFile( dir ).should.equal false
        
        for file in path.files
            it "should detect that '#{ file }' is a file", ->
                butcher.isFile( file ).should.equal true

    describe 'Chops list (routes)', ->
        butcher = new Butchershop()

        butcher.chop '/test/route1/{path*}', '../local-test/route1'
        butcher.chop '/test/route2/{path*}', '../local-test/route2'

        routes = butcher.server._router.table()
        #console.log(inspect routes)


        it "should have 2 routes defined", ->
            routes.length.should.equal 2

        it "should match the hapijs route path", ->
            routes[0].path.should.equal "/test/route1/{path*}"

mocha       = require "mocha"
should      = require "should"
Butchershop = require "../index"

describe "Butchershop", ()->

    describe "#constructor()", () ->

        it "should not require any user config", () ->
          new Butchershop().should.be.ok
        
        it "should set default local-server properties", () ->
          butcher = new Butchershop()
          butcher.options.local.host.should.equal "localhost"
          butcher.options.local.port.should.equal 8000
        
        it "should set default proxy properties", () ->
          butcher = new Butchershop()
          butcher.options.proxy.protocol.should.equal "http"
          butcher.options.proxy.host.should.equal "npmjs.org"
          butcher.options.proxy.port.should.equal 80
    
    describe "#isFile", ()->
        
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
            it "should detect that '#{ dir }' is a directory", ()->
                butcher.isFile( dir ).should.equal false
        
        for file in path.files
            it "should detect that '#{ file }' is a file", ()->
                butcher.isFile( file ).should.equal true
        
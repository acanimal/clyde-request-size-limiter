"use strict";

var http = require("http"),
    path = require("path"),
    clyde = require("clydeio"),
    request = require("supertest");


describe("request-size-limit", function() {

  var server;

  before(function() {
    var options = {
      port: 8888,
      logfile: path.join(__dirname, "..", "tmp", "clyde.log"),
      loglevel: "info",

      prefilters: [
        {
          id: "request-size-limiter",
          path: path.join(__dirname, "../lib/index.js"),
          config: {
            limit: "100b",
            length: "5"
          }
        }
      ],

      providers: [
        {
          id: "id",
          context: "/provider",
          target: "http://server"
        }
      ]
    };

    // Create server with clyde's middleware options
    var middleware = clyde.createMiddleware(options);
    server = http.createServer(middleware);
    server.listen(options.port);
  });

  after(function() {
    server.close();
  });


  it("should fail due invalid request size limit", function(done) {
    request("http://127.0.0.1:8888")
      .post("/foo")
      .send("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
      .expect(413, done);
  });


  it("should fail due invalid content length", function(done) {
    request("http://127.0.0.1:8888")
      .get("/foo")
      .send("Invalid content length")
      .expect(400, done);
  });


  it("should success", function(done) {
    // NOTE: We expect an error 404 (provider not found) which means the filters
    // has passed.
    request("http://127.0.0.1:8888")
      .get("/foo")
      .send("12345")
      .expect(404, done);
  });

});

var nock = require('nock');
var Client = require('../lib/client');
var resources = require('../lib/resources');
var superagent = require('superagent');

module.exports = {
  setUp: function (callback) {
    this.client = new Client({
      user: 'user@xyz.com',
      apiKey: '1234567890',
      apiUri: 'shop.com/api'
    });
    callback();
  },

  'throws an error with a partial config': function (test) {
    var configA = { user: 'user@xyz.com' };
    var configB = { user: 'user@xyz.com', apiKey: '1234567890' };
    var configC = { user: 'user@xyz.com', apiKey: '1234567890', apiUri: 'shop.com/api' };

    test.throws(function () { new Client(configA); });
    test.throws(function () { new Client(configB); });
    test.doesNotThrow(function () { new Client(configC); });
    test.done();
  },

  'sanitizes the base API URI': function (test) {
    var client = new Client({
      user: 'user@xyz.com',
      apiKey: '1234567890',
      apiUri: 'shop.com/api//'
    });

    test.equal(client.config.apiUri, 'shop.com/api/');
    test.done();
  },

  'initializes the API resources': function (test) {
    for (var resource in resources) {
      var propertyName = resource.charAt(0).toLowerCase() + resource.slice(1);
      test.ok(this.client[propertyName]);
    }
    test.done();
  },

  'knows how to build a query string': function (test) {
    var objectA = { a: 1, b: true, c: 'string' };
    var objectB = { a: 2, b: true, c: 'string' };
    test.equal(this.client.toParams(objectA), 'a=1&b=true&c=string');
    test.notEqual(this.client.toParams(objectB), 'a=1&b=true&c=string');
    test.done();
  },

  'knows how to build a complete URI': function (test) {
    test.equal(this.client.buildUri(['test']), 'shop.com/api/test');
    test.equal(this.client.buildUri(['test', 'x']), 'shop.com/api/test/x');
    test.equal(this.client.buildUri(['test', 'y'], { a: 1, b: 2 }), 'shop.com/api/test/y?a=1&b=2');
    test.notEqual(this.client.buildUri(['false']), 'shop.com/api/test');
    test.done();
  },

  'knows how to handle a successful request': function(test) {
    var apiMock = nock('https://shop.com').get('/test').reply(201, '{}', { 'Content-Type': 'application/json' });
    this.client.call('get', 'https://shop.com/test', {}, function () { test.done(); });
  },

  'knows how to handle a failed request': function(test) {
    var apiMock = nock('shop.com').get('/test').reply(400, {}, { 'Content-Type': 'application/json' });
    this.client.call('get', 'https://shop.com/test', {}, {}, function () { test.done(); });
  }
};

var request = require('superagent');
var resources = require('./resources');

var Client = function (config) {
  // Can be undefined if using env values.
  this.config = config || {};

  // Load values from env if necessary.
  this.config.user = config.user || process.env.MYCASHFLOW_API_USER;
  this.config.apiKey = config.apiKey || process.env.MYCASHFLOW_API_KEY;
  this.config.apiUri = config.apiUri || process.env.MYCASHFLOW_API_URI;

  // Debug mode will enable some console.logging.
  this.config.debug = config.debug || false;

  // Fail if anything is missing from the config object.
  if (!this.config.user || !this.config.apiKey || !this.config.apiUri) {
    throw new Error('Invalid configuration. Did you supply all the required parameters?');
  }

  // Ensure a single slash at the end of the API URI.
  this.config.apiUri = this.config.apiUri.replace(/\/+$/g, '');
  this.config.apiUri += '/';

  // Initialize the API resources.
  for (var resource in resources) {
    var propertyName = resource.charAt(0).toLowerCase() + resource.slice(1);
    this[propertyName] = new resources[resource](this);
  }
};

Client.prototype.parseArgs = function (params, onSuccess, onError) {
  if (typeof params !== 'function') {
    return [params, onSuccess, onError];
  }
  return [{}, params, onSuccess];
};

Client.prototype.toParams = function (obj) {
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
};

Client.prototype.buildUri = function (uri, params) {
  uri = this.config.apiUri + uri.join('/');
  if (params && Object.keys(params).length) {
    uri += '?' + this.toParams(params);
  }
  return uri;
};

Client.prototype.call = function (method, uri, params, onSuccess, onError) {
  var self = this;
  var requestStr = method + ' ' + uri;

  if (this.config.debug) {
    console.log('Request >> ' + requestStr);
  }

  request[method](uri).send(params)
    .auth(this.config.user, this.config.apiKey)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err) {
        if (self.config.debug) {
          console.log('Errored >> ' + err);
        }
        if (onError && typeof onError === 'function') {
          onError(err);
        }
      } else {
        if (self.config.debug) {
          console.log('Success >> ' + requestStr);
        }
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(res.body);
        }
      }
    });
};

Client.prototype.get = function (uri, params, onSuccess, onError) {
  this.call('get', this.buildUri(uri, params), {}, onSuccess, onError);
};

Client.prototype.post = function (uri, params, onSuccess, onError) {
  this.call('post', this.buildUri(uri), params, onSuccess, onError);
};

Client.prototype.patch = function (uri, params, onSuccess, onError) {
  this.call('patch', this.buildUri(uri), params, onSuccess, onError);
};

Client.prototype.delete = function (uri, params, onSuccess, onError) {
  this.call('delete', this.buildUri(uri), params, onSuccess, onError);
};

module.exports = Client;

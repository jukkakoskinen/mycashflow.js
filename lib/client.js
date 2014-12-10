var request = require('request');
var resources = require('./resources');

var ERROR_CODES = {
  400: 'Bad Request',
  401: 'Not Authorized',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  503: 'Service Unavailable'
};

var SUCCESS_CODES = {
  200: 'OK',
  201: 'Created',
  204: 'No Content'
};

var Client = function(config) {
  // Can be undefined if using env values.
  this.config = config || {};

  // Load values from env if necessary.
  this.config.user = config.user || process.env['MYCASHFLOW_API_USER'];
  this.config.apiKey = config.apiKey || process.env['MYCASHFLOW_API_KEY'];
  this.config.apiUri = config.apiUri || process.env['MYCASHFLOW_API_URI'];

  // Debug mode will enable some console.logging.
  this.config.debug = config.debug || false;

  // Fail if anything is missing from the config object.
  if (!this.config.user || !this.config.apiKey || !this.config.apiUri) {
    throw new Error('Invalid configuration. Did you supply all the required parameters?');
  }

  // Ensure one slash at the end of the API URI.
  this.config.apiUri = this.config.apiUri.replace(/\/$/g, '');
  this.config.apiUri += '/';

  // Initialize the API resources.
  for (var resource in resources) {
    var propertyName = resource.charAt(0).toLowerCase() + resource.slice(1);
    this[propertyName] = new resources[resource](this);
  }
};

Client.prototype.parseArgs = function(params, onSuccess, onError) {
  if (typeof params !== 'function') {
    return [params, onSuccess, onError];
  }
  return [{}, params, onSuccess];
};

Client.prototype.toParams = function(obj) {
  return Object.keys(obj).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
};

Client.prototype.buildUri = function(uri, params) {
  var uri = this.config.apiUri + uri.join('/');
  if (params && Object.keys(params).length) {
    uri += '?' + this.toParams(params);
  }
  return uri;
};

Client.prototype.call = function(method, uri, params, onSuccess, onError) {
  var self = this;

  // Request options.
  var options = {
    method: method,
    url: uri,
    body: params,
    json: true,
    headers: {
      'Accept': 'application/json'
    }
  };

  // The request we're about to make. Used for logging.
  var requestStr = options.method + ' ' + options.url;

  // Request callback.
  function onResponse(error, response, body) {
    var statusCode = response.statusCode;

    // An error can be caused something like a refused
    // connection or an erroneous response status code.
    if (error || ERROR_CODES[statusCode]) {
      if (self.config.debug) {
        requestStr += ' - ' + statusCode + ' - ' + ERROR_CODES[statusCode];
        console.log('Errored: ' + requestStr);
      }
      if (onError && typeof onError === 'function') {
        onError(error);
      }
    } else {
      if (self.config.debug) {
        requestStr += ' ' + statusCode + ' - ' + SUCCESS_CODES[statusCode];
        console.log('Success: ' + requestStr);
      }
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(body);
      }
    }
  }

  if (this.config.debug) {
    console.log('Request: ' + requestStr);
  }
  // Make the request with the authentication header.
  request(options, onResponse).auth(this.config.user, this.config.apiKey);
};

Client.prototype.get = function(uri, params, onSuccess, onError) {
  this.call('GET', this.buildUri(uri, params), {}, onSuccess, onError);
};

Client.prototype.post = function(uri, params, onSuccess, onError) {
  this.call('POST', this.buildUri(uri), params, onSuccess, onError);
};

Client.prototype.patch = function(uri, params, onSuccess, onError) {
  this.call('PATCH', this.buildUri(uri), params, onSuccess, onError);
};

Client.prototype.delete = function(uri, params, onSuccess, onError) {
  this.call('DELETE', this.buildUri(uri), params, onSuccess, onError);
};

module.exports = Client;

var Customers = function (client) {
  this.client = client;
};

Customers.prototype.list = function (params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['customers'], args[0], args[1], args[2]);
};

Customers.prototype.get = function (id, onSuccess, onError) {
  this.client.get(['customers', id], {}, onSuccess, onError);
};

Customers.prototype.update = function (id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.patch(['customers', id], args[0], args[1], args[2]);
};

Customers.prototype.secondaryAddresses = function (id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['customers', id, 'secondary_addresses'], args[0], args[1], args[2]);
};

module.exports = Customers;

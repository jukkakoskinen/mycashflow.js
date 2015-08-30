var Suppliers = function (client) {
  this.client = client;
};

Suppliers.prototype.list = function (params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['suppliers'], args[0], args[1], args[2]);
};

Suppliers.prototype.create = function (params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.post(['suppliers'], args[0], args[1], args[2]);
};

Suppliers.prototype.get = function (id, onSuccess, onError) {
  this.client.get(['suppliers', id], {}, onSuccess, onError);
};

Suppliers.prototype.update = function (id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.patch(['suppliers', id], args[0], args[1], args[2]);
};

Suppliers.prototype.delete = function (id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.delete(['suppliers', id], args[0], args[1], args[2]);
};

module.exports = Suppliers;

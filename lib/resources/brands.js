var Brands = function(client) {
  this.client = client;
};

Brands.prototype.list = function(params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['brands'], args[0], args[1], args[2]);
};

Brands.prototype.create = function(params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.post(['brands'], args[0], args[1], args[2]);
};

Brands.prototype.get = function(id, onSuccess, onError) {
  this.client.get(['brands', id], {}, onSuccess, onError);
};

Brands.prototype.update = function(params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.post(['brands', id], args[0], args[1], args[2]);
};

Brands.prototype.delete = function(params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.delete(['brands', id], args[0], args[1], args[2]);
};

module.exports = Brands;

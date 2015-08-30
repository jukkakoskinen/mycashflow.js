var Products = function (client) {
  this.client = client;
};

Products.prototype.list = function (params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['products'], args[0], args[1], args[2]);
};

Products.prototype.get = function (id, onSuccess, onError) {
  this.client.get(['products', id], {}, onSuccess, onError);
};

Products.prototype.update = function (id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.patch(['products', id], args[0], args[1], args[2]);
};

module.exports = Products;

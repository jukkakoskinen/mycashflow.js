var Stock = function(client) {
  this.client = client;
};

Stock.prototype.list = function(params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['stock'], args[0], args[1], args[2]);
};

Stock.prototype.get = function(id, onSuccess, onError) {
  this.client.get(['stock', id], {}, onSuccess, onError);
};

Stock.prototype.update = function(id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.patch(['stock', id], args[0], args[1], args[2]);
};

module.exports = Stock;

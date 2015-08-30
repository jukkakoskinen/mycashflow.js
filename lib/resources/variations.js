var Variations = function (client) {
  this.client = client;
};

Variations.prototype.list = function (params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['variations'], args[0], args[1], args[2]);
};

Variations.prototype.get = function (id, onSuccess, onError) {
  this.client.get(['variations', id], {}, onSuccess, onError);
};

Variations.prototype.update = function (id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.patch(['variations', id], args[0], args[1], args[2]);
};

module.exports = Variations;

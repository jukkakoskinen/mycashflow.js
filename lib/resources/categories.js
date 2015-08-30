var Categories = function (client) {
  this.client = client;
};

Categories.prototype.list = function (params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['categories'], args[0], args[1], args[2]);
};

Categories.prototype.get = function (id, onSuccess, onError) {
  this.client.get(['categories', id], {}, onSuccess, onError);
};

Categories.prototype.update = function (id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.patch(['categories', id], args[0], args[1], args[2]);
};

Categories.prototype.subcategories = function (id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['categories', id, 'subcategories'], args[0], args[1], args[2]);
};

module.exports = Categories;

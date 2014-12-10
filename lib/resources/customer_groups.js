var CustomerGroups = function(client) {
  this.client = client;
};

CustomerGroups.prototype.list = function(params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['customer-groups'], args[0], args[1], args[2]);
};

CustomerGroups.prototype.create = function(params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.post(['customer-groups'], args[0], args[1], args[2]);
};

CustomerGroups.prototype.get = function(id, onSuccess, onError) {
  this.client.get(['customer-groups', id], {}, onSuccess, onError);
};

CustomerGroups.prototype.update = function(id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.patch(['customer-groups', id], args[0], args[1], args[2]);
};

CustomerGroups.prototype.delete = function(id, params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.delete(['customer-groups', id], args[0], args[1], args[2]);
};

module.exports = CustomerGroups;

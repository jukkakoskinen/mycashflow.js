var Versions = function (client) {
  this.client = client;
};

Versions.prototype.list = function (params, onSuccess, onError) {
  var args = this.client.parseArgs(params, onSuccess, onError);
  this.client.get(['versions'], args[0], args[1], args[2]);
};

Versions.prototype.get = function (id, onSuccess, onError) {
  this.client.get(['versions', id], {}, onSuccess, onError);
};

module.exports = Versions;

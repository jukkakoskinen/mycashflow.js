var MyCashflow = require('./lib/client');

// Initialize the API client.
var myCashflow = new MyCashflow({
  debug: true,
  user: '',
  apiKey: '',
  apiUri: ''
});

// Fetch some products.
myCashflow.products.list({ page_size: 10 }, function (res) {
  console.log(res);
});

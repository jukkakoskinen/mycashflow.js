# MyCashflow API

A simple node module for working with the MyCashflow API. Please consult the original browseable documentation for more technical insight on API details.

### Usage

First, require the node module:

	var MyCashflow = require('mycashflow');

Configure through `env vars`:

```
export MYCASHFLOW_API_USER = x
export MYCASHFLOW_API_KEY  = y
export MYCASHFLOW_API_URI  = z
```

```
var myCashflow = new MyCashflow();
```

Or pass a configuration object:

	var myCashflow = new MyCashflow({
		user:   ..., // Shop API user
		apiKey: ..., // Shop API key
		apiUri: ...  // Shop API endpoint (https://shop.com/api/v1/)
	});

Pass `debug: true` to enable console output.

### Implemented Resources

The client conforms to MyCashflow API version 0.4.0.

* Brands
	* get
	* list
	* create
	* update
	* delete
* Categories
	* list
	* get
	* update
	* subcategories
* Customers
	* get
	* list
	* update
	* secondaryAddresses
* Customer Groups
	* list
	* get
	* create
	* update
	* delete
* Products
	* get
	* list
	* update
* Stock
	* get
	* list
	* update
* Suppliers
	* get
	* list
	* create
	* update
	* delete
* Variations
	* get
	* list
	* update
* Versions
	* get
	* list

### Development

Running the tests:

	npm test

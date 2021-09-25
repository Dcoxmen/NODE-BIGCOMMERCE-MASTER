## Using node-bigcommerce for node js to connect to the api to get product info. Also testing unirest npm for node js.

## Just clone the repo and run npm i to install all packages. To start the server use npm run dev.

## Use localhost: 4000 to see home page. There are two search fields to filter by product sku and company sponser.

## After submitting the form the bigcommerce api is called and populates the result page with the product info by the sku called.

## This will be arranged in an html template using handlebars. Then a button to download the page as a pdf will allow the result page to be downloaded.

#-----------------------------------------------------------------

# Bigcommerce for Node.js

[![Build Status](https://travis-ci.org/getconversio/node-bigcommerce.svg?branch=master)](https://travis-ci.org/getconversio/node-bigcommerce)

A node module for authentication and use with the BigCommerce API

## Installation

To install the module using NPM:

```
npm install node-bigcommerce
```

Or Yarn:

```
yarn add node-bigcommerce
```

## Setup

Include the 'node-bigcommerce' module within your script and instantiate it with a config:

```javascript
const BigCommerce = require("node-bigcommerce");

const bigCommerce = new BigCommerce({
  logLevel: "info",
  clientId: "128ecf542a35ac5270a87dc740918404",
  secret: "acbd18db4cc2f85cedef654fccc4a4d8",
  callback: "https://myapplication.com/auth",
  responseType: "json",
  headers: { "Accept-Encoding": "*" }, // Override headers (Overriding the default encoding of GZipped is useful in development)
  apiVersion: "v3", // Default is v2
});
```

##### Instantiating a BigCommerce instance without a config object will result in an error

## Authorization

Set up your Big Commerce as above and pass the following configuration options in:

```
{
  clientId: 'Your application's client ID',
  secret: 'Your secret',
  callback: 'The location you want the app to return to on success',
  responseType: 'json'
}
```

You will be able to get your Client ID and Secret within your application setup. Below is an example using Express' routes:

```javascript
const express = require('express'),
  router = express.Router(),
  BigCommerce = require('node-bigcommerce');

const bigCommerce = new BigCommerce({
  clientId: '128ecf542a35ac5270a87dc740918404',
  secret: 'acbd18db4cc2f85cedef654fccc4a4d8',
  callback: 'https://myapplication.com/auth',
  responseType: 'json'
});

router.get('/auth', (req, res, next) => {
  bigCommerce.authorize(req.query)
    .then(data => res.render('integrations/auth', { title: 'Authorized!', data: data })
    .catch(next);
  });
});
```

The `authorize` method requires the query parameters from the request to be passed. These are required to request a permanent access token which will be passed back in the data object.

An example data object:

```
{
  access_token: '9df3b01c60df20d13843841ff0d4482c',
  scope: 'store_v2_orders_read_only store_v2_products_read_only users_basic_information store_v2_default',
  user: {
    id: 12345,
    username: 'John Smith',
    email: 'john@success.com'
  },
  context: 'stores/x43tqo'
}
```

From this object you can store the `access_token` for re-use when calling the Big Commerce API.

## Load & Uninstall

The only configuration element required to use the `verify` method (used for both load and uninstall endpoints) is `secret`. Below is an example using Express' routes:

```javascript
const express = require("express"),
  router = express.Router(),
  BigCommerce = require("node-bigcommerce");

const bigCommerce = new BigCommerce({
  secret: "acbd18db4cc2f85cedef654fccc4a4d8",
  responseType: "json",
});

router.get("/load", (req, res, next) => {
  try {
    const data = bigCommerce.verify(req.query["signed_payload"]);
    res.render("integrations/welcome", { title: "Welcome!", data: data });
  } catch (err) {
    next(err);
  }
});
```

The `verify` method requires the `signed_payload` query parameter to be passed from the request. This is used to verify that the request has come from Big Commerce. The `verify` method returns the following object:

```
{
  user: {
    id: 12345,
    email: 'john@success.com'
  },
  context: 'stores/x43tqo',
  store_hash: 'x43tqo',
  timestamp: 1421748597.4395974
}
```

This will allow you to automatically log the user in (if required) when BigCommerce calls the load endpoint or remove/label a user that has uninstalled your application from their Big Commerce account.

## Calling the API

The API can be called once the user has been authorized and has an access token. There is a helper for each type of request available within Big Commerce (GET, POST, PUT, DELETE).

To make an API Request you will need the following minimum configuration:

```
{
  clientId: 'Your application's client ID',
  accessToken: 'Token assigned to the user during authorisation',
  storeHash: 'The short hash for the store',
  responseType: 'json'
}
```

Parameters that are added to the url need to be escaped before they are passed as part of the path of any call:

```javascript
const path = "/products?name=" + escape("Plain T-Shirt");
```

### GET

The `Get` call requires a path: get(path):

```javascript
const BigCommerce = require('node-bigcommerce');

const bigCommerce = new BigCommerce({
  clientId: '128ecf542a35ac5270a87dc740918404'
  accessToken: '9df3b01c60df20d13843841ff0d4482c',
  responseType: 'json'
});

bigCommerce.get('/products')
  .then(data => {
    // Catch any errors, or handle the data returned
  });
```

### POST & PUT

The 'POST' & 'PUT' calls requires a path with optional data to be sent: post(path, data):

```javascript
var BigCommerce = require('node-bigcommerce');

var bigCommerce = new BigCommerce({
  clientId: '128ecf542a35ac5270a87dc740918404'
  accessToken: '9df3b01c60df20d13843841ff0d4482c',
  responseType: 'json'
});

var product = {
  name: 'Plain T-Shirt',
  type: 'physical',
  description: 'This timeless fashion staple will never go out of style!',
  price: '29.99',
  categories: [18],
  availability: 'available',
  weight: '0.5'
}

// Replace 'post' with 'put' for a put call
bigCommerce.post('/products', product)
  .then(data => {
  // Catch any errors, or handle the data returned
  });
```

### DELETE

The 'DELETE' call requires a path: delete(path). A delete call will not return any data and will return a response status of 204.

```javascript
const BigCommerce = require("node-bigcommerce");

const bigCommerce = new BigCommerce({
  clientId: "128ecf542a35ac5270a87dc740918404",
  accessToken: "9df3b01c60df20d13843841ff0d4482c",
});

bigCommerce.delete("/products/" + productId).then(() => {
  // Catch any errors, data will be null
});
```

## Debugging

We use `debug`, so just run with environment variable DEBUG set to `node-bigcommerce:*`

```js
$ DEBUG=node-bigcommerce:* node my_test.js
```

## Response Type

You may require the Big Commerce API to return data in a specific format. To return in either JSON or XML just add a 'responseType' to the config:

```javascript
const BigCommerce = require("node-bigcommerce");

const bigCommerce = new BigCommerce({
  logLevel: "info",
  clientId: "128ecf542a35ac5270a87dc740918404",
  accessToken: "9df3b01c60df20d13843841ff0d4482c",
  responseType: "xml",
});

bigCommerce.post("/products?name=" + escape("Plain T-Shirt")).then((data) => {
  // Catch any errors, data will be null
});
```

Note that when returning in JSON the data will be parsed into an object, XML will not, and will return a string. When no response type is given the type will resort to whatever the BigCommerce default is.

#Unirest for Node js
Unirest for Node.js Build Status
License Downloads Gitter

Unirest is a set of lightweight HTTP libraries available in multiple languages, built and maintained by Kong, who also maintain the open-source API Gateway Kong.

Installing
To utilize unirest for node.js install the the npm module:

$ npm install unirest
After installing the npm package you can now start simplifying requests like so:

var unirest = require('unirest');
Creating Requests
You're probably wondering how by using Unirest makes creating requests easier. Besides automatically supporting gzip, and parsing responses, lets start with a basic working example:

unirest
.post('http://mockbin.com/request')
.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
.send({ "parameter": 23, "foo": "bar" })
.then((response) => {
console.log(response.body)
})
Uploading Files
Transferring file data has been simplified:

unirest
.post('http://mockbin.com/request')
.headers({'Content-Type': 'multipart/form-data'})
.field('parameter', 'value') // Form field
.attach('file', '/tmp/file') // Attachment
.then(function (response) {
console.log(response.body)
})
Custom Entity Body
unirest
.post('http://mockbin.com/request')
.headers({'Accept': 'application/json'})
.send(Buffer.from([1,2,3]))
.then(function (response) {
console.log(response.body)
})
Unirest
A request can be initiated by invoking the appropriate method on the unirest object, then calling .end() to send the request. Alternatively you can send the request directly by providing a callback along with the url.

unirest(method [, uri, headers, body, callback])
method - Request type (GET, PUT, POST, etc...)
uri - Optional; When passed will return a Request object. Otherwise returns generated function with method pre-defined (e.g. unirest.get)
headers (Object) - Optional; HTTP Request headers
body (Mixed) - Optional; HTTP Request body
callback (Function) - Optional; Invoked when Request has finalized with the argument Response
unirest[method](url [, headers, body, callback])
method - Request type, pre-defined methods, see below.
url - Request location.
headers (Object | Function) - Optional; When Object headers are passed along to the Request.header method, when Function this argument is used as the callback.
body (Mixed | Function) - Optional; When body is not a Function it will be passed along to Request.send() method, otherwise when a Function it will be used as the callback.
callback (Function) - Optional; Calls end with given argument, otherwise Request is returned.
All arguments above, with the exclusion of url, will accept a Function as the callback. When no callback is present, the Request object will be returned.

get
Returns a Request object with the method option set to GET

var Request = unirest.get('http://mockbin.com/request')
head
Returns a Request object with the method option set to HEAD

let Request = unirest.head('http://mockbin.com/request')
put
Returns a Request object with the method option set to PUT

let Request = unirest.put('http://mockbin.com/request')
post
Returns a Request object with the method option set to POST

let Request = unirest.post('http://mockbin.com/request')
patch
Returns a Request object with the method option set to PATCH

let Request = unirest.patch('http://mockbin.com/request')
delete
Returns a Request object with the method option set to DELETE

let Request = unirest.delete('http://mockbin.com/request')
unirest.jar()
Creates a container to store multiple cookies, i.e. a cookie jar.

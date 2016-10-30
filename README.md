# inquiry-traverser

[![npm version](https://badge.fury.io/js/inquiry-traverser.svg)](https://badge.fury.io/js/inquiry-traverser) [![dependencies](https://david-dm.org/ta2edchimp/inquiry-traverser.svg)](https://david-dm.org/ta2edchimp/inquiry-traverser) [![dev dependencies](https://david-dm.org/ta2edchimp/inquiry-traverser/dev-status.svg)](https://david-dm.org/ta2edchimp/inquiry-traverser#info=devDependencies) [![peer dependencies](https://david-dm.org/ta2edchimp/inquiry-traverser/peer-status.svg)](https://david-dm.org/ta2edchimp/inquiry-traverser#info=peerDependencies)

A Promise based wrapper for prompting branched questions with [Inquirer.js](https://github.com/sboudrias/Inquirer.js) and alternatives using the same API, such as [inquirer-shortcuts](https://github.com/breuleux/inquirer-shortcuts)

## Documentation

### Installation

```
$ npm install inquiry-traverser
```

```JavaScript
var inquirer = require('inquirer');
var traverser = require('inquiry-traverser');

var traverse = traverser(inquirer);

traverse({ /* Put your branched questions object here */ })
  .then(function onResolve (value) {
    // Handle a successfull resolution ...
  })
  .catch(function onReject (reason) {
    // Handle a rejection ...
  });
```

### Examples

Check the `examples` folder, run the scripts, e.g.

```
$ node examples/basic-usage.js
```

The `basic-usage` example shows the use of prompts of type `confirm`, the module's redirection feature and provokes a rejection on the second prompt due to a missing resolution of one of its results.  
The `advanced-usage` example uses prompts of type `list`, `rawlist` and `expand`, as well as the redirection feature.

### Differences to default Inquirer.js Behaviour

Contrary to the default behaviour of Inquirer.js, which resolves the returned promise with user's responses to _all prompted questions_, the Promise returned by `inquiry-traverser` receives only a particular value (see the [basic usage](https://github.com/ta2edchimp/inquiry-traverser/blob/master/examples/basic-usage.js) example).

## Todos

Currently `inquiry-traverser` lacks a proper documentation and tests. At the moment, even only prompts of type `confirm` are tested.  
This will change and be more complete soon, hopefully. Until then, feel free to [file bug reports or make suggestions](https://github.com/ta2edchimp/inquiry-traverser/issues). Pull requests welcome :)

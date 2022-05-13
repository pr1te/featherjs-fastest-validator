# feathers-fastest-validator

[![Build Status](https://travis-ci.org/JPooban/featherjs-fastest-validator.png?branch=master)](https://travis-ci.org/JPooban/featherjs-fastest-validator)
[![Coverage Status](https://coveralls.io/repos/github/JPooban/featherjs-fastest-validator/badge.svg?branch=master)](https://coveralls.io/github/JPooban/featherjs-fastest-validator?branch=master)
[![Download Status](https://img.shields.io/npm/dm/feathers-fastest-validator.svg?style=flat-square)](https://www.npmjs.com/package/feathers-fastest-validator)
[![npm version](https://badge.fury.io/js/feathers-fastest-validator.svg)](https://www.npmjs.com/package/feathers-fastest-validator)

Feathers hooks for schema validation extended from [fastest-validator](https://github.com/icebob/fastest-validator)

## Table of content
- [Installation](#installation)
- [Usage](#usage)
- [Properties](#properties)
- [License](#license)

<a name="installation"></a>
## Installation
Recommended using either yarn or npm for install.

```
# NPM
$ npm install feathers-fastest-validator --save

# YARN
$ yarn add feathers-fastest-validator
```

<a name="usage"></a>
## Usage
The library is extended from Fastest Validator to support validate function on Feathers hook. For others Fastest Validator function such as `add custom rules`, `add customized error message`, `add alias validation`, and etc. Please read more on https://github.com/icebob/fastest-validator. Here's an example of a Feathers server that uses `feathers-fastest-validator`.

```js
const Validator = require('feathers-fastest-validator');

// create validator instance
const validator = new Validator();

// More information about schema validation,
// please visit here https://github.com/icebob/fastest-validator
const schema = {
  key: { type: 'string' },
}

// The data that need to validate
const field = 'data'

//  The hooks can only use as a `before` hooks
export.before = {
  create: [ validator.validateHook(schema, field) ]
}
```

<a name="properties"></a>
## Properties
The parameter for `validateHook(schema, field)`.

| Parameter | Default |        Type        |                        Description                       |
|:----------|:-------:|--------------------|----------------------------------------------------------|
| schema    | -       | `ValidationSchema` | Please visit https://github.com/icebob/fastest-validator |
| field      | `data`  | `string`           | the reference of data which need to validate such as `context.data` or `context.params.query`. For more info about feathers hook context plese visit https://docs.feathersjs.com/api/hooks.html. |


<a name="license"></a>
## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/pr1te)

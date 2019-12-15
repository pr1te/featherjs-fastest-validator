# feathers-fastest-validator

[![Build Status](https://travis-ci.org/JPooban/featherjs-fastest-validator.png?branch=master)](https://travis-ci.org/JPooban/featherjs-fastest-validator)
[![Coverage Status](https://coveralls.io/repos/github/JPooban/featherjs-fastest-validator/badge.svg?branch=master)](https://coveralls.io/github/JPooban/featherjs-fastest-validator?branch=master)
[![Dependency Status](https://img.shields.io/david/JPooban/featherjs-fastest-validator.svg?style=flat-square)](https://david-dm.org/JPooban/featherjs-fastest-validator)
[![Download Status](https://img.shields.io/npm/dm/feathers-fastest-validator.svg?style=flat-square)](https://www.npmjs.com/package/feathers-fastest-validator)

Feathers hooks for schema validation using [fastest-validator](https://github.com/icebob/fastest-validator) as a core validator

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

Here's an example of a Feathers server that uses `feathers-fastest-validator`.

```js
const validator = require('feathers-fastest-validator');


/**
 * More information about schema validation,
 * please visit here https://github.com/icebob/fastest-validator
 */ 
const schema = {
  key: { type: 'string' },
}

/**
 * The data that need to validate
 */
const field = 'data'

/**
 * The hooks can only use as a before hooks
 */
export.before = {
  create: [validator(schema, field)]
}
```

<a name="properties"></a>
## Properties
The parameter name suppose from `validator(schema, data)`.

| Parameter | Default |        Type        |                        Description                       |
|:----------|:-------:|--------------------|----------------------------------------------------------|
| schema    | -       | `ValidationSchema` | Please visit https://github.com/icebob/fastest-validator |
| data      | `data`  | `string`           | the reference of data which need to validate such as `context.data` or `context.params.query`. For more info about feathers hook context plese visit https://docs.feathersjs.com/api/hooks.html. |


<a name="license"></a>
## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).

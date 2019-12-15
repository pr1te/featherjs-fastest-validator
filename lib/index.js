'use strict';

const { BadRequest } = require('@feathersjs/errors');
const Validator = require('fastest-validator');


/**
 * Validator
 *
 * @param {Any} schema
 * @param {string} field
 *
 * @description This hook integrate with fastest-validator as a core validator function
 * @see https://github.com/icebob/fastest-validator
 *
 * @author Jugkapong Pooban <j.pooban@gmail.com>
 */
module.exports = function validate (schema, data = 'data') {
  return (ctx) => {
    const { type } = ctx;

    /**
     * The hook working on before hooks, it'll throw an error if using as a after hooks and error hooks
     */
    if (type !== 'before') throw new Error('The \'feathers-fastest-validator\' hook can only be used as a \'before\' hook.');

    const validator = new Validator();
    const entity = ctx[data];
    const checker = validator.compile(schema);
    const result = checker(entity);

    if (result !== true) throw new BadRequest('Validation failed', result);

    return ctx;
  };
};

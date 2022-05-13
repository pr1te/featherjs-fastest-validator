const _ = require('lodash');
const { BadRequest } = require('@feathersjs/errors');
const FastestValidator = require('fastest-validator');

class Validator extends FastestValidator {
  /**
   * @param {Any} schema
   * @param {string} field
   *
   * @description This hook integrate with fastest-validator as a core validator function
   * @see https://github.com/icebob/fastest-validator
   *
   * @author Jugkapong Pooban <j.pooban@gmail.com>
   */
  validateHook (schema, field = 'data') {
    return (ctx) => {
      const { type } = ctx;

      /**
       * The hook working on before hooks, it'll throw an error if using as a after hooks and error hooks
       */
      if (type !== 'before') throw new Error('The \'feathers-fastest-validator\' hook can only be used as a \'before\' hook.');

      const entity = _.get(ctx, field);
      const checker = this.compile(schema);
      const result = checker(entity);

      if (result !== true) throw new BadRequest('Validation failed', result);

      return ctx;
    };
  }
}

module.exports = Validator;

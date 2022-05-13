/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const feathers = require('@feathersjs/feathers');
const { BadRequest } = require('@feathersjs/errors');
const FastestValidator = require('fastest-validator');

const Validator = require('../lib');

test.beforeEach((t) => {
  // create new plain feathers application
  t.context.app = feathers();

  // create validate instance
  t.context.validator = new Validator();

  // register the dummies service
  t.context.app.use('/dummies', {
    async create (data) {
      if (!data) throw new Error('data is undefined');
      return data;
    },
  });
});

test('should be extended from \'FastestValidator\' instance', (t) => {
  t.true(Validator.prototype instanceof FastestValidator)
});

test('must THROW an error, if using \'feathers-fastest-validator\' hooks as AFTER hooks', async (t) => {
  // arrange: assign validate hooks to after hooks of dummies service
  const { app, validator } = t.context;

  const schema = {
    key: { type: 'string' },
  };

  app.service('dummies').hooks({
    after: {
      create: [ validator.validateHook(schema) ],
    },
  });

  // act
  const error = await t.throwsAsync(async () => {
    await app.service('dummies').create({ key: 'value' });
  }, { instanceOf: Error });

  // assert
  t.is(error.message, 'The \'feathers-fastest-validator\' hook can only be used as a \'before\' hook.');
});


test('must THROW an error, if using \'feathers-fastest-validator\' hooks as ERROR hooks', async (t) => {
  // arrange: assign validate hooks to error hooks of dummies service
  const { app, validator } = t.context;

  const schema = {
    key: { type: 'string' },
  };

  app.service('dummies').hooks({
    error: {
      create: [ validator.validateHook(schema) ],
    },
  });

  // act
  const error = await t.throwsAsync(async () => {
    await app.service('dummies').create(undefined);
  }, { instanceOf: Error });

  // assert
  t.is(error.message, 'The \'feathers-fastest-validator\' hook can only be used as a \'before\' hook.');
});


test('must NOT THROW an error, if using \'feathers-fastest-validator\' hooks as BEFORE hooks', async (t) => {
  // arrange: assign validate hooks to after hooks of dummies service
  const { app, validator } = t.context;

  const schema = {
    key: { type: 'string' },
  };

  app.service('dummies').hooks({
    before: {
      create: [ validator.validateHook(schema) ],
    },
  });

  // act
  const promise = app.service('dummies').create({ key: 'value' });

  // assert
  await t.notThrowsAsync(promise);
});


test('must THROW an error, if validate the data failed', async (t) => {
  // arrange: assign validate hooks to error hooks of dummies service
  const { app, validator } = t.context;

  const schema = {
    key: { type: 'number' },
  };

  app.service('dummies').hooks({
    before: {
      create: [ validator.validateHook(schema) ],
    },
  });

  // act
  const error = await t.throwsAsync(async () => {
    await app.service('dummies').create({ key: 'value' });
  }, { instanceOf: BadRequest });

  // assert
  t.is(error.message, 'Validation failed');
});


test('return data, if use \'feathers-fastest-validator\' hooks as before hooks and pass the validation', async (t) => {
  // arrange: assign validate hooks to before hook and set up the ValidationSchema to validate data
  const { app, validator } = t.context;

  const schema = {
    key: { type: 'string' },
  };

  app.service('dummies').hooks({
    before: {
      create: [ validator.validateHook(schema) ],
    },
  });

  // act
  const promise = app.service('dummies').create({ key: 'value' });

  // assert
  await t.notThrowsAsync(promise);

  t.deepEqual(await promise, { key: 'value' });
});

/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const feathers = require('@feathersjs/feathers');
const validator = require('../lib');


test.beforeEach((t) => {
  /** Create new plain feathers application */
  t.context = { app: feathers() };

  /** Register the dummies service */
  t.context.app.use('/dummies', {
    async create (data) {
      if (!data) throw new Error('data is undefined');
      return data;
    },
  });
});


test('the type of \'feathers-fastest-validator\' should be a function', (t) => {
  /** Arrange, Act */
  const type = typeof validator;

  /** Assert */
  t.is(type, 'function');
});


test('must THROW an error, if using \'feathers-fastest-validator\' hooks as AFTER hooks', async (t) => {
  /** Arrange: assign validate hooks to after hooks of dummies service */
  const { app } = t.context;

  app.service('dummies').hooks({
    after: {
      create: [
        validator({
          key: { type: 'string' },
        }),
      ],
    },
  });

  /** Act */
  const error = await t.throwsAsync(async () => {
    await app.service('dummies').create({ key: 'value' });
  }, Error);

  /** Assert */
  t.is(error.message, 'The \'feathers-fastest-validator\' hook can only be used as a \'before\' hook.');
});


test('must THROW an error, if using \'feathers-fastest-validator\' hooks as ERROR hooks', async (t) => {
  /** Arrange: assign validate hooks to error hooks of dummies service */
  const { app } = t.context;

  app.service('dummies').hooks({
    error: {
      create: [
        validator({
          key: { type: 'string' },
        }),
      ],
    },
  });

  /** Act */
  const error = await t.throwsAsync(async () => {
    await app.service('dummies').create(undefined);
  }, Error);

  /** Assert */
  t.is(error.message, 'The \'feathers-fastest-validator\' hook can only be used as a \'before\' hook.');
});


test('must NOT THROW an error, if using \'feathers-fastest-validator\' hooks as BEFORE hooks', async (t) => {
  /** Arrange: assign validate hooks to after hooks of dummies service */
  const { app } = t.context;

  app.service('dummies').hooks({
    before: {
      create: [
        validator({
          key: { type: 'string' },
        }),
      ],
    },
  });

  /** Act */
  const promise = app.service('dummies').create({ key: 'value' });

  /** Assert */
  await t.notThrowsAsync(promise);
});


test('must THROW an error, if validate the data failed', async (t) => {
  /** Arrange: assign validate hooks to error hooks of dummies service */
  const { app } = t.context;

  app.service('dummies').hooks({
    before: {
      create: [
        validator({
          key: { type: 'number' },
        }),
      ],
    },
  });

  /** Act */
  const error = await t.throwsAsync(async () => {
    await app.service('dummies').create({ key: 'value' });
  }, Error);

  /** Assert */
  t.is(error.message, 'Validation failed');
});


test('return data, if use \'feathers-fastest-validator\' hooks as before hooks and pass the validation', async (t) => {
  /** Arrage: assign validate hooks to before hook and set up the ValidationSchema to validate data */
  const { app } = t.context;

  app.service('dummies').hooks({
    before: {
      create: [
        validator({
          key: { type: 'string' },
        }),
      ],
    },
  });

  /** Act */
  const promise = app.service('dummies').create({ key: 'value' });

  /** Assert */
  await t.notThrowsAsync(promise);
  t.deepEqual(await promise, { key: 'value' });
});

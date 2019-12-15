import { ValidationSchema } from 'fastest-validator';

declare module 'feathers-fastest-validator' {

  interface Schema extends ValidationSchema {}

  type Field = string;

  export {
    Schema,
    Field,
  };
}

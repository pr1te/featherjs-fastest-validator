import { Hook } from '@feathersjs/feathers';
import { ValidationSchema } from 'fastest-validator';

declare module 'feathers-fastest-validator' {

  export default function validator(schema: ValidationSchema, data?: Data): Hook;

  interface Schema extends ValidationSchema {}

  type Data = string;

  export {
    Schema,
    Data,
  };
}

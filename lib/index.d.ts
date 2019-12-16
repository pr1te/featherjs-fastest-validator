import { HookContext } from '@feathersjs/feathers';
import { ValidationSchema } from 'fastest-validator';

declare module 'feathers-fastest-validator' {

  export default function validator(schema: ValidationSchema, data?: Data): HookContext;

  interface Schema extends ValidationSchema {}

  type Data = string;

  export {
    Schema,
    Data,
  };
}

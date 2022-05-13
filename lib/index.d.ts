import { Hook } from '@feathersjs/feathers';
import FastestValidator, {
  ValidationRule,
  ValidationSchema,
  CompilationFunction,
  ValidatorConstructorOptions,
} from 'fastest-validator';

declare module 'feathers-fastest-validator' {
  interface Schema extends ValidationSchema {}

  type ValidateField = String;

  export default class Validator extends FastestValidator {
    validateHook (schema: Schema, field?: ValidateField): Hook;
  }

  export {
    Schema,
    ValidateField,
  };
}

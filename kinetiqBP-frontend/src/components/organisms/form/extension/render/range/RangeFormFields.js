import { RangeRenderer, rangeType } from './Range';

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
export class RangeFormFields {
  constructor(formFields) {
    formFields.register(rangeType, RangeRenderer);
  }
}

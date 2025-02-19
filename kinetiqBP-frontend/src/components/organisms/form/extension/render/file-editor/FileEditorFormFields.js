import { FileEditorRender, fileEditorType } from './FileEditor';

export class FileEditorFormFields {
  constructor(formFields) {
    formFields.register(fileEditorType, FileEditorRender);
  }
}

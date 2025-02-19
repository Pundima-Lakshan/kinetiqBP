import { Errors, FilePicker, FormContext, Label } from '@bpmn-io/form-js';
import { html, useContext, useEffect, useRef } from 'diagram-js/lib/ui';
import Ids from 'ids';
import { formFieldClasses } from '../utils';

import { FileEditorEditIcon, FileEditorIcon } from './file-editor-svg';

import './styles.css';

const ids = new Ids();
const EMPTY_ARRAY = [];
const FILE_EDITOR_FILE_KEY_PREFIX = 'file-editor::';

export const fileEditorType = 'file-editor';

export function FileEditorRender(props) {
  const fileInputRef = useRef(null);
  const { getService } = useContext(FormContext);
  const fileRegistry = getService('fileRegistry', false);
  const eventBus = getService('eventBus', false);
  const { field, onChange, domId, errors = [], disabled, readonly, value: filesKey = '' } = props;
  const { label, multiple = false, accept = '', validate = {} } = field;

  const errorMessageId = `${domId}-error-message`;
  const selectedFiles = fileRegistry === null ? EMPTY_ARRAY : fileRegistry.getFiles(filesKey);

  useEffect(() => {
    if (filesKey && fileRegistry !== null && !fileRegistry.hasKey(filesKey)) {
      onChange({ value: null });
    }
  }, [fileRegistry, filesKey, onChange, selectedFiles.length]);

  useEffect(() => {
    const data = new DataTransfer();
    selectedFiles.forEach((file) => data.items.add(file));
    fileInputRef.current.files = data.files;
  }, [selectedFiles]);

  const onFileChange = (event) => {
    const input = event.target;

    // if we have an associated file key but no files are selected, clear the file key and associated files
    if ((input.files === null || input.files.length === 0) && filesKey !== '') {
      fileRegistry.deleteFiles(filesKey);
      onChange({ value: null });
      return;
    }

    const files = Array.from(input.files);

    // ensure fileKey exists
    const updatedFilesKey = filesKey ?? ids.nextPrefixed(FILE_EDITOR_FILE_KEY_PREFIX);

    fileRegistry.setFiles(updatedFilesKey, files);
    onChange({ value: updatedFilesKey });
  };

  const onFilesClick = (index) => {
    eventBus.fire('fileEditor.open', { files: selectedFiles, index });
  };

  const isInputDisabled = disabled || readonly || fileRegistry === null;

  return html`<div class=${formFieldClasses(fileEditorType, { errors, disabled, readonly })}>
    <${Label} htmlFor=${domId} label=${label} required=${validate.required} />
    <input
      type="file"
      className="fjs-hidden"
      ref=${fileInputRef}
      id=${domId}
      name=${domId}
      disabled=${isInputDisabled}
      multiple=${multiple}
      accept=${accept}
      onChange=${onFileChange}
      required=${validate.required}
    />
    <div className="fjs-filepicker-container">
      <button
        type="button"
        disabled=${isInputDisabled}
        readOnly=${readonly}
        class="fjs-button fjs-filepicker-button"
        onClick=${() => {
          fileInputRef.current.click();
        }}
      >
        Browse
      </button>
      <span class="fjs-form-field-label file-editor-files-links"> ${getSelectedFilesLabel(selectedFiles, onFilesClick)} </span>
    </div>
    <${Errors} id=${errorMessageId} errors=${errors} />
  </div>`;
}

FileEditorRender.config = {
  ...FilePicker.config,
  type: fileEditorType,
  label: 'File editor',
  name: 'File editor',
  iconUrl: `data:image/png;base64,${encodeURIComponent(FileEditorIcon)}`,
};

// helper //////////

/**
 * @param {File[]} files
 * @returns {string}
 */
function getSelectedFilesLabel(files, clickHandler) {
  if (files.length === 0) {
    return 'No files selected';
  }

  return files.map((file, index) => {
    return html`<span class="fjs-file-editor-file file-editor-files-open-link" onClick=${() => clickHandler(index)}>
      <span>${file.name}</span> <span>${FileEditorEditIcon}</span>
    </span>`;
  });
}

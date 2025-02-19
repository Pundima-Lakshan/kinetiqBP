export const customKBPFormFieldEventNames = {
  fileEditorOpen: 'fileEditor,open',
} as const;

export type CustomKBPFormEventName = (typeof customKBPFormFieldEventNames)[keyof typeof customKBPFormFieldEventNames];

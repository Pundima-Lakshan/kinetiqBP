export const mutationKeys = {
  dummy: 'dummy',

  formDefinition: 'formDefinition',

  workflowDefinition: 'workflowDefinition',

  workflowInstance: 'workflowInstance',

  historicWorkflowInstance: 'historicWorkflowInstance',

  processInstanceVariables: 'processInstanceVariables',

  task: 'task',

  pdfTemplate: 'pdfTemplate',

  analysisChartConfig: 'analysisChartConfig',
} as const;

export const mutationType = {
  post: 'post',
  put: 'put',
  remove: 'remove',
} as const;

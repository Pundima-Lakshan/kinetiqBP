import { ContainerBox } from '@/components/atoms';
import { AnalysisChartType } from '@/components/molecules';
import { KBPFormViewer, KbpFormViewerChangeEvent, KBPFormViewerRefObj } from '@/components/organisms';
import {
  ChartConfigChartTypeKey,
  ChartConfigQueryTypeKey,
  getAnCardDisplayFormSchema,
  getChartConfigurationFormSchema,
  getPlaceHolderFormSchema,
  getQuerTaskFormSchema,
  getQueryActivityFormSchema,
  getQueryProcessFormSchema,
} from '@/configs';
import { QueryType, usePostAnalysisChartConfig } from '@/services';
import { useDrawerStore, useDrawerStoreActions } from '@/store';
import { useSyncedState } from '@/utils';
import { Box, Button, Typography } from '@mui/material';
import { useNotifications, useSession } from '@toolpad/core';
import { useRef, useState } from 'react';

export const DashboardDrawer = () => {
  const notifications = useNotifications();

  const queryType = useDrawerStore((selecter) => selecter.queryType);
  const chartType = useDrawerStore((selecter) => selecter.chartType);

  const { updateFormData, updateChartType, updateQueryType } = useDrawerStoreActions();

  const [localFormData, setLocalFormData] = useState(useDrawerStore.getState().formData);

  const { state: formSchema, setState: setFormSchema } = useSyncedState({
    getter: () => {
      const placeholderSchema = getPlaceHolderFormSchema();
      const chartConfigSchema = getChartConfigurationFormSchema();

      placeholderSchema.components.push(...chartConfigSchema.components);

      switch (chartType) {
        case 'bar': {
          break;
        }
        case 'card': {
          const cardSchema = getAnCardDisplayFormSchema();
          placeholderSchema.components.push(...cardSchema.components);
          break;
        }
        case 'line': {
          break;
        }
        case 'gauge': {
          break;
        }
      }

      switch (queryType) {
        case 'process': {
          const processSchema = getQueryProcessFormSchema();
          placeholderSchema.components.push(...processSchema.components);
          break;
        }
        case 'activity': {
          const activitySchema = getQueryActivityFormSchema();
          placeholderSchema.components.push(...activitySchema.components);
          break;
        }
        case 'task': {
          const taskSchema = getQuerTaskFormSchema();
          placeholderSchema.components.push(...taskSchema.components);
          break;
        }
      }

      return placeholderSchema;
    },
    deps: [queryType, chartType],
  });

  const kbpFormViewerRef = useRef<KBPFormViewerRefObj>(null);

  const handleChange = (event: unknown) => {
    const typedEvent = event as KbpFormViewerChangeEvent;
    const formData = typedEvent.submitResult.data;
    updateFormData(formData);
    const chartType = typedEvent.submitResult.data[ChartConfigChartTypeKey] as AnalysisChartType;
    if (!Object.is(useDrawerStore.getState().chartType, chartType)) {
      updateChartType(chartType);
      setLocalFormData(formData);
    }
    const queryType = typedEvent.submitResult.data[ChartConfigQueryTypeKey] as QueryType;
    if (!Object.is(useDrawerStore.getState().queryType, queryType)) {
      updateQueryType(queryType);
      setLocalFormData(formData);
    }
  };

  const { mutate: postAnalysisChartConfig, isPending: isPendingPostAnalysisChartConfig } = usePostAnalysisChartConfig();

  const sessions = useSession();

  const handleSubmit = () => {
    const submitResponse = kbpFormViewerRef.current?.getSubmitResponse();
    if (submitResponse?.errors && Object.keys(submitResponse.errors).length > 0) {
      notifications.show('There are errors in the form values', {
        severity: 'error',
      });
      return;
    }
    if (submitResponse?.data && sessions?.user?.id) {
      postAnalysisChartConfig({
        configSchema: submitResponse?.data,
        createdBy: sessions.user.id,
      });
    }
  };

  const isLoading = isPendingPostAnalysisChartConfig;

  return (
    <ContainerBox style={{ padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <Typography variant="h5" align="center" color="info" style={{ marginBottom: '20px', fontWeight: '600' }}>
          Analysis Chart
        </Typography>
      </Box>
      <ContainerBox style={{ flex: '1', overflowY: 'auto', paddingBottom: '20px' }}>
        <KBPFormViewer schema={formSchema} ref={kbpFormViewerRef} changedHandler={handleChange} data={localFormData} />
      </ContainerBox>
      <Box style={{ marginTop: '10px', textAlign: 'center' }}>
        <Button loading={isLoading} onClick={handleSubmit} color="success" variant="contained" style={{ width: '100%', padding: '12px 0' }}>
          Submit
        </Button>
      </Box>
    </ContainerBox>
  );
};

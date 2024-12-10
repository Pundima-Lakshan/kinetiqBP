import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FormViewer } from '../components/form/form-viewer.tsx';
import { FormEditorComponent } from '../components/form/form-editor.tsx';
import { FlowComponent } from '../components/react-flow/flow.tsx';
import { GrafanaIframe } from '../components/grafana-iframe.tsx';
import { BpmnEditor } from '../components/bpmn/bpmn-editor.tsx';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: 'calc(100% - 48px)' }}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, height: '100%' }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Forms = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }} className={'forms-container'}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Flow" {...a11yProps(0)} />
          <Tab label="Viewer" {...a11yProps(1)} />
          <Tab label="Editor" {...a11yProps(2)} />
          <Tab label="Dashboard" {...a11yProps(3)} />
          <Tab label="BPMN editor" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FlowComponent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FormViewer />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FormEditorComponent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GrafanaIframe />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <BpmnEditor />
      </CustomTabPanel>
    </Box>
  );
};

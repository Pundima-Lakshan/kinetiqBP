import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { BpmnEditor, Designer, Form, FormViewer, GrafanaIframe } from '@/components';
import KBPFormPlayground from '@/components/organisms/form/form-playground.tsx';

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
          <Tab label="PDF Designer" {...a11yProps(5)} />
          <Tab label="PDF Form and Viewer" {...a11yProps(6)} />
          <Tab label="Form Playground" {...a11yProps(7)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}></CustomTabPanel>
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
      <CustomTabPanel value={value} index={5}>
        <Designer />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <Form />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <KBPFormPlayground />
      </CustomTabPanel>
    </Box>
  );
};

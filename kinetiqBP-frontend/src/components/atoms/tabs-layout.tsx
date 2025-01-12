import * as React from 'react';
import { ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelLayoutProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanelLayout = (props: TabPanelLayoutProps) => {
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

export interface TabItem {
  label: string;
  component: ReactNode;
}

export interface TabsLayoutProps {
  tabItems: TabItem[];
}

export const TabsLayout = ({ tabItems }: TabsLayoutProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }} className={'forms-container'}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabItems.map((item, index) => {
            return <Tab key={item.label} label={item.label} {...a11yProps(index)} />;
          })}
        </Tabs>
      </Box>
      {tabItems.map((item, index) => {
        return (
          <TabPanelLayout key={item.label} value={value} index={index}>
            {item.component}
          </TabPanelLayout>
        );
      })}
    </Box>
  );
};

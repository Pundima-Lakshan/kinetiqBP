import CloseIcon from '@mui/icons-material/Close';
import { Box, Tab, Tabs } from '@mui/material';
import React, { type ReactNode } from 'react';

import './styles.css';

export interface TabItem {
  label: string;
  component: ReactNode;
  disabled?: boolean;
  closeHandler?: () => void;
}

export interface TabsLayoutProps {
  tabItems: TabItem[];
}

export const TabSheet = ({ tabItems }: TabsLayoutProps) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  const renderIcon = (item: TabItem) => {
    if (item.closeHandler) {
      return <CloseIcon color="warning" onClick={item.closeHandler} />;
    }
    return <></>;
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }} className={'forms-container'}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={handleChange} aria-label="tabs" variant="scrollable" scrollButtons="auto">
          {tabItems.map((item, index) => {
            const icon = renderIcon(item);
            return <Tab key={item.label} label={item.label} {...a11yProps(index)} icon={icon} iconPosition="end" disabled={item.disabled} />;
          })}
        </Tabs>
      </Box>
      <Box className="tab-content-container">
        {tabItems.map((item, index) => {
          return (
            <TabPanelLayout key={item.label} activeTabIndex={activeTabIndex} index={index}>
              {item.component}
            </TabPanelLayout>
          );
        })}
      </Box>
    </Box>
  );
};

interface TabPanelLayoutProps {
  children?: React.ReactNode;
  index: number;
  activeTabIndex: number;
}

const TabPanelLayout = (props: TabPanelLayoutProps) => {
  const { children, activeTabIndex, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={`tab-content-item ${activeTabIndex === index ? 'active' : ''}`}
      {...other}
    >
      <Box sx={{ p: 2, height: '100%' }}>{children}</Box>
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

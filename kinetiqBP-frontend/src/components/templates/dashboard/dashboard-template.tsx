import { DashboardDrawer } from './dashboard-drawer';
import { DashboardDrawerSetup } from './dashboard-drawer-setup';
import { DashboardMain } from './dashboard-main';

export const DashboardTemplate = () => {
  const renderMain = () => {
    return <DashboardMain groups={[]} />;
  };
  const renderDrawer = () => {
    return <DashboardDrawer />;
  };
  return <DashboardDrawerSetup main={renderMain()} drawerContent={renderDrawer()} />;
};

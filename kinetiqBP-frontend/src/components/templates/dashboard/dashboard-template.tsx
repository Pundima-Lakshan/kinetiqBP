import { AnalysisConfigEntry, AnalysisConfigSchema } from '@/services';
import { DashboardDrawer } from './dashboard-drawer';
import { DashboardDrawerSetup } from './dashboard-drawer-setup';
import { DashboardMain } from './dashboard-main';
import { useSyncedState } from '@/utils';
import { AnalysisGroupProps } from '@/components/atoms';
import { AnalysisChart, SwapyReactiveItem } from '@/components/molecules';

interface DashboardTemplateProps {
  analysisChartConfigs: AnalysisConfigEntry[];
  isLoading: boolean;
}

export const DashboardTemplate = ({ analysisChartConfigs, isLoading }: DashboardTemplateProps) => {
  const { state: groups, setState: setGroups } = useSyncedState<AnalysisGroupProps[]>({
    getter: () => {
      const groupsMap = new Map<string, { title: string; items: SwapyReactiveItem[] }>();
      analysisChartConfigs.forEach((ac) => {
        const typedSchema = ac.configSchema as unknown as AnalysisConfigSchema;

        let component;
        switch (typedSchema.chartType) {
          case 'card': {
            component = (
              <AnalysisChart
                type="card"
                title={typedSchema.chartTitle}
                description={typedSchema.description}
                queryType={typedSchema.queryType}
                queryArgs={typedSchema}
              />
            );
          }
        }

        const swappyItem: SwapyReactiveItem = {
          id: typedSchema.chartTitle,
          component,
        };

        const groupItem = groupsMap.get(typedSchema.group);
        if (groupItem) {
          groupItem.items.push(swappyItem);
        } else {
          groupsMap.set(typedSchema.group, { items: [swappyItem], title: typedSchema.group });
        }
      });
      return [...groupsMap.values()];
    },
    deps: [analysisChartConfigs],
  });

  const renderMain = () => {
    return <DashboardMain groups={groups} />;
  };
  const renderDrawer = () => {
    return <DashboardDrawer />;
  };
  return <DashboardDrawerSetup main={renderMain()} drawerContent={renderDrawer()} />;
};

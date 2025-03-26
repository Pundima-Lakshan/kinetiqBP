import { AnalysisGroupProps, AnalysisGroup, ContainerBox } from '@/components';

interface DashboardMainProps {
  groups: AnalysisGroupProps[];
}

export const DashboardMain = ({ groups }: DashboardMainProps) => {
  return (
    <ContainerBox style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '7px', overflowY: 'auto' }}>
      {groups.map((g, i) => (
        <AnalysisGroup key={i} title={g.title} description={g.description} items={g.items} />
      ))}
    </ContainerBox>
  );
};

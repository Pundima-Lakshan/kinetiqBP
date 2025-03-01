import { DialogConfirmationActions } from '@/components/atoms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import {
  useGetFlowableUser,
  useGetFlowableUserInfo,
  useGetFlowableUserInfoList,
  type FlowableUser,
  type FlowableUserInfoKey,
  type FlowableUserInfoListItem,
} from '@/services';
import { Dialog, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import type { DialogProps } from '@toolpad/core';

interface ViewUseDialogPayload {
  userId: string;
}

export const ViewUserDialog = ({ open, onClose, payload }: DialogProps<ViewUseDialogPayload>) => {
  const { data: flowableUser, isLoading: isLoadingFlowableUser } = useGetFlowableUser(payload.userId);
  const { data: flowableUserInfoList = [], isLoading: isLoadingFlowableUserInfoList } = useGetFlowableUserInfoList(payload.userId);

  const handleConfirm = () => {
    onClose();
  };

  const isLoading = isLoadingFlowableUser || isLoadingFlowableUserInfoList;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>User details</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {flowableUser && <UserContent user={flowableUser} userInfoList={flowableUserInfoList} />}
      </DialogContent>
      <DialogConfirmationActions isLoading={isLoading} onConfirm={handleConfirm} confirmLabel="Okay" />
    </Dialog>
  );
};

interface UserContentProps {
  user: FlowableUser;
  userInfoList: FlowableUserInfoListItem[];
}

const UserContent = (props: UserContentProps) => {
  const userBasicContentList: Omit<UserInfoItemProps, 'userId'>[] = [
    {
      label: 'First name',
      defaultValue: props.user.firstName,
    },
    {
      label: 'Last name',
      defaultValue: props.user.lastName,
    },
    {
      label: 'Email',
      defaultValue: props.user.email,
    },
  ];

  const userInfoContentList: Omit<UserInfoItemProps, 'userId'>[] = props.userInfoList.map((info) => ({
    defaultValue: null,
    label: info.key,
    infoKey: info.key,
  }));

  const userContentList = [...userBasicContentList, ...userInfoContentList];

  return (
    <Grid2 container spacing={3} style={{ padding: '16px', overflowY: 'auto' }}>
      {userContentList.map((content) => {
        return (
          <Grid2 key={`${content.label}-${content.defaultValue}`} size={3}>
            <UserInfoItem defaultValue={content.defaultValue} label={content.label} userId={props.user.id} infoKey={content.infoKey} />
          </Grid2>
        );
      })}
    </Grid2>
  );
};

interface UserInfoItemProps {
  label: string;
  defaultValue: string | number | null;
  minWidth?: string;
  infoKey?: FlowableUserInfoKey;
  userId: string;
}

const UserInfoItem = ({ defaultValue, label, minWidth, userId, infoKey }: UserInfoItemProps) => {
  const { data: flowableUserInfo } = useGetFlowableUserInfo(userId, infoKey ?? 'invalid', !!infoKey);
  const _defaultValue = infoKey ? flowableUserInfo?.value : defaultValue;
  return (
    <TextField
      key={`${label}-${_defaultValue}`}
      label={infoKey ?? label}
      defaultValue={_defaultValue}
      sx={{ minWidth: _defaultValue ? (minWidth ?? '300px') : '150px' }}
      fullWidth
      slotProps={{
        input: {
          readOnly: true,
        },
      }}
    />
  );
};

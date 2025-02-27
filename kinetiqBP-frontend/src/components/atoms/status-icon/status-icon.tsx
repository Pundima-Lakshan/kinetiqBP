import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './styles.css';

export const StatusIcon = ({ status }: { status: 'done' | 'not' | 'pending' }) => {
  return (
    <div className="status-icon-container">
      {status === 'done' && <CheckCircleIcon color="success" />}
      {status === 'not' && <CancelIcon color="error" />}
    </div>
  );
};

import { RouterProvider } from 'react-router';
import { browserRouter } from '@/configs';
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from '@/services';

export const App = () => {
  return (
    <AuthProvider {...oidcConfig}  >
      <RouterProvider router={browserRouter} />
    </AuthProvider>
  );
};

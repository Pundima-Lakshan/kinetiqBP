import { browserRouter } from '@/configs';
import { oidcConfig } from '@/services';
import { AuthProvider } from 'react-oidc-context';
import { RouterProvider } from 'react-router';

export const App = () => {
  return (
    <AuthProvider {...oidcConfig}>
      <RouterProvider router={browserRouter} />
    </AuthProvider>
  );
};

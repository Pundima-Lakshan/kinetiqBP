import { browserRouter } from '@/configs';
import { oidcConfig } from '@/services';
import { AuthProvider } from 'react-oidc-context';
import { RouterProvider } from 'react-router';
import { ReactQueryProvider } from './providers';

export const App = () => {
  return (
    <AuthProvider {...oidcConfig}>
      <ReactQueryProvider>
        <RouterProvider router={browserRouter} />
      </ReactQueryProvider>
    </AuthProvider>
  );
};

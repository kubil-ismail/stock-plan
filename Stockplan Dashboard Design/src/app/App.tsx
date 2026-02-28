import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { NotificationProvider } from './contexts/notification-context';
import { AuthProvider } from './contexts/auth-context';
import { DetailNavbarProvider } from './contexts/detail-navbar-context';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <DetailNavbarProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" />
        </DetailNavbarProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
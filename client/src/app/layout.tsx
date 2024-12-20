
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/dates/styles.css';
import { UserProvider } from '@/component/userContext/userContext';
export const metadata = {
  title: 'Gym connect',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <UserProvider>
          <MantineProvider>
            <Notifications />
            {children}
          </MantineProvider>
        </UserProvider>

      </body>
    </html>
  );
}
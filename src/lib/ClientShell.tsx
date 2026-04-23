'use client';

import { ReactNode } from 'react';
import AppShell from './routes/App';
import { UserContextProvider } from './store/UserContext';

export default function ClientShell({ children }: { children: ReactNode }) {
	return (
		<UserContextProvider>
			<AppShell>{children}</AppShell>
		</UserContextProvider>
	);
}

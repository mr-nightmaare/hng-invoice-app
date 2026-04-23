import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import ClientShell from '@/fem/ClientShell';
import './globals.css';

const leagueSpartan = League_Spartan({
	subsets: ['latin'],
	variable: '--font-league-spartan',
});

export const metadata: Metadata = {
	title: 'Invoice App',
	description: 'Frontend Mentor invoice app interface',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html id="html" lang="en" className={`${leagueSpartan.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<ClientShell>{children}</ClientShell>
			</body>
		</html>
	);
}

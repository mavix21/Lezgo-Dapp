import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promoter dashboard',
  description: 'Create and manage your events',
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <h1>Dashboard layout</h1>
      <nav></nav>

      {children}
    </section>
  );
}

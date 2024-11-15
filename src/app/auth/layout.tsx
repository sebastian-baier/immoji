'use server';

import ToolLayout from '@/containers/layout/tool-layout';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayout>{children}</ToolLayout>;
}

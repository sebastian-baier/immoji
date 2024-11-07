import SubLayout from '@/containers/layout/sub-layout';

export default async function PropertyLayout({ children }: { children: React.ReactNode }) {
  return <SubLayout>{children}</SubLayout>;
}

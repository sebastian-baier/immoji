import SubLayout from '@/containers/layout/sub-layout';

export default async function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return <SubLayout>{children}</SubLayout>;
}

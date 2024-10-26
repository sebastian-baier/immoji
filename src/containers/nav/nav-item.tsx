import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`flex flex-row items-center justify-start gap-2 rounded-md p-2 text-lg font-medium transition-colors ${
        isActive ? 'bg-purple-900 text-white' : 'text-gray-500 hover:bg-indigo-100 hover:text-white'
      }`}
    >
      <Icon size={1.5} className={`${isActive ? 'text-white' : 'text-gray-500'}`} />
      {label}
    </Link>
  );
}

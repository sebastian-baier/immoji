export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={`h-screen w-full overflow-hidden bg-black `}>
      <main
        id="main-content"
        className="flex justify-center items-center h-full w-full overflow-y-auto bg-transparent scrollbar-none dark:bg-neutral-900"
      >
        {children}
      </main>
    </body>
  );
}

'use server';


export default async function Property(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return <div className="flex flex-col items-start gap-6">{params.id}</div>;
}

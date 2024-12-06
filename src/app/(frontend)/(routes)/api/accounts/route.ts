import { dbFetch } from '@/api/db-fetch';

export async function GET(request: Request) {
  const data = await dbFetch(`SELECT * FROM public.accounts`);

  return Response.json(
    { data: data },
    {
      status: 200,
    },
  );
}

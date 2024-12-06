import { dbFetch } from '@/api/db-fetch';

export async function GET(request: Request) {
  const data = await dbFetch(`SELECT * FROM public.games`);

  return Response.json(
    { data: data },
    {
      status: 200,
    },
  );
}

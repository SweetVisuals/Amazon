const ACCESS_TOKEN = "sbp_fd7aa7c92f1cc7c43cf07573e49ca7f524fc465a";
const PROJECT_REF = "jphvgqbqvzlbyoqbnwsd";

const sql = `
  CREATE POLICY "Public products insert" ON public.products FOR INSERT WITH CHECK (true);
  CREATE POLICY "Public products update" ON public.products FOR UPDATE USING (true);
  CREATE POLICY "Public products delete" ON public.products FOR DELETE USING (true);
`;

async function run() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });
  console.log(await res.text());
}
run();

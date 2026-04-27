const ACCESS_TOKEN = "sbp_fd7aa7c92f1cc7c43cf07573e49ca7f524fc465a";
const PROJECT_REF = "jphvgqbqvzlbyoqbnwsd";

async function run() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: 'SELECT 1;' })
  });
  console.log(await res.text());
}
run();

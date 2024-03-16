export async function POST(request: Request) {
  const data = await request.json()
  console.log(`POST request: ${data}`)

  const random = Math.random();

  if (random < 0.3) {
    return new Response('Server error', {
      status: 500
    });
  }

  return new Response('Success', {
    status: 200
  })
}
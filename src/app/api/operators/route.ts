import {operators} from "./data";

export const dynamic = 'force-dynamic';

// randomly returns server error
// cat fetch operator by id (/api/operators?id={id}) - returns single operator or server error if not found
// can fetch operators with limit (/api/operators?limit={number}) - returns first {number} operators
// can fetch all operators (/api/operators)

export async function GET(request: Request) {

  const random = Math.random();
  if (random < 0.3) {
    return new Response('Server error', {
      status: 500
    });
  }

  const {searchParams} = new URL(request.url);

  const id = searchParams.get("id")
  const limit = Number(searchParams.get("limit"))

  if (id) {
    const operator = operators.find(element => element.id === id);

    if (!operator) {
      return new Response('Operator not found', {
        status: 404
      })
    }

    return Response.json(operator)
  }

  if (limit) {
    return Response.json(operators.slice(0, limit))
  }

  return Response.json(operators);
}
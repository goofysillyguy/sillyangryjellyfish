export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === "/api/items") {
      const { results } = await env.DB.prepare("SELECT * FROM items").all()
      return Response.json(results)
    }

    return new Response("Not Found", { status: 404 })
  }
}

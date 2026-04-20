export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const id = searchParams.get('id');
  const env = context.env;

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        "Authorization": `Token ${env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    // 返回整个状态对象给前端
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

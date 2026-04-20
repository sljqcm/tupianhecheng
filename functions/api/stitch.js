export async function onRequestPost(context) {
  const { request, env } = context;
  const { imageA, imageB, prompt } = await request.json();

  // 这里使用的是 Replicate 上一个支持 Inpainting/Blending 的模型 ID
  // 你可以根据需求替换为具体的模型 Version
  const MODEL_VERSION = "c46014457f9509df639c4a869894314c9444df478d1a1b1834e56580a133b1e3";

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: {
          image: imageA,
          mask: imageB,
          prompt: prompt,
          negative_prompt: "low quality, messy"
        }
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify({ id: data.id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

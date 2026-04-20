export async function onRequestPost(context) {
  const { request, env } = context;
  const { imageA, imageB, prompt } = await request.json();

  // 调用 Replicate 的 Image-to-Image / Inpainting 模型
  // 这里推荐使用 SDXL Inpainting 或专门的 Blending 模型
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "c46014457f9509df639c4a869894314c9444df478d1a1b1834e56580a133b1e3", // 示例：某个好用的融合模型
      input: {
        image: imageA,
        mask: imageB, // 这里逻辑视具体模型而定，通常是将 B 作为新增元素
        prompt: prompt
      }
    })
  });

  const data = await response.json();
  return new Response(JSON.stringify({ id: data.id }), {
    headers: { "Content-Type": "application/json" }
  });
}

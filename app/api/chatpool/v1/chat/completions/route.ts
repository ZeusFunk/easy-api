import { NextRequest } from "next/server";

const getRandomKey = (keyArr: string[]) => {
  // 生成一个随机数作为索引
  const randomIndex = Math.floor(Math.random() * keyArr.length);
  // 根据随机索引获取对应的元素
  const randomKey = keyArr[randomIndex];
  return randomKey;
};

export async function POST(req: NextRequest) {
  const apiKey = getRandomKey(process.env.API_POOL!.split(","));
  const url = "https://api.openai.com/v1/chat/completions";
  const body = await req.json();
  console.log(apiKey);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
}

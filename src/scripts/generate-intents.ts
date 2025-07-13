
import { getEmbedding } from "../app/api/utils/utils";

const texts = [
  "query: how to use AI tools",
  "query: best AI tools for blogging",
  "query: buy AI writing tools"
];

(async () => {
  for (const text of texts) {
    const emb = await getEmbedding(text);
    console.log(JSON.stringify(emb));
  }
})();

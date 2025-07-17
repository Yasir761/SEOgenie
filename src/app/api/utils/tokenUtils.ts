import { encode } from "gpt-tokenizer"

const DEFAULT_MODEL_LIMIT = 2048; 

export function countTokens(text: string): number {
  return encode(text).length;
}

export function isWithinTokenLimit(text: string, limit = DEFAULT_MODEL_LIMIT): boolean {
  return countTokens(text) <= limit;
}

export function splitTextByTokenLimit(text: string, limit = DEFAULT_MODEL_LIMIT): string[] {
  const words = text.split(" ");
  const chunks: string[] = [];
  let currentChunk: string[] = [];

  for (const word of words) {
    currentChunk.push(word);
    const chunkText = currentChunk.join(" ");
    if (countTokens(chunkText) > limit) {
      currentChunk.pop(); // remove last word that caused overflow
      chunks.push(currentChunk.join(" "));
      currentChunk = [word]; // start next chunk
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }

  return chunks;
}

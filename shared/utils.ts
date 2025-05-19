
import { encodeHex } from "$std/encoding/hex.ts";

export async function hash(string: string) {
  const stringBuffer = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", stringBuffer);
  return encodeHex(hashBuffer);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function random(length: number) {
  let result = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    const randomInd = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomInd);
  }
  return result;
}
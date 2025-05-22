
import { LOGIN_ATTEMPTS_COUNT, LOGIN_ATTEMPTS_TIMEOUT } from "../shared/constants.ts";
import { kv } from "./database.ts";

export class LoginAttempts {
  name: string = "logins";
  timeout: number = Number(LOGIN_ATTEMPTS_TIMEOUT); // in seconds
  threshold: number = Number(LOGIN_ATTEMPTS_COUNT); // how many attempts allowed

  async attempt(ip: string): Promise<boolean> {
    
    const time = Math.trunc(Date.now() / this.timeout / 1000);
    const key = [this.name, ip, time];
    const record = await kv.get<Deno.KvU64>(key);
    const count = Number(record.value?.value ?? 0);

    // ip has to many failed attempts
    if (count > this.threshold) {
      return false;
    }

    // increment failed attempt by one
    const u64 = new Deno.KvU64(1n);
    await kv.atomic()
      .sum(key, u64.value) 
      .commit();

    return true;
  }
}

export const logins = new LoginAttempts();
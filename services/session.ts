import { setCookie, getCookies, deleteCookie } from "$std/http/cookie.ts";
import { SESSION_KEY, SESSION_LIFETIME } from "../shared/constants.ts";
import { hash } from "../shared/utils.ts";

export default class Session {
  request: Request;

  constructor(req: Request) {
    this.request = req;
  }


  get() {
    const cookies = getCookies(this.request.headers);
    return cookies.user;
  }

  set(headers: Headers, userId: string) {
    const url = new URL(this.request.url);

    setCookie(headers, {
      name: "user",
      value: userId,
      maxAge: Number(SESSION_LIFETIME),
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
      httpOnly: true
    });
  }

  async create(headers: Headers) {
    const url = new URL(this.request.url);
    const userId = crypto.randomUUID();
    const authValue = `${userId}:${SESSION_KEY}`;
    const hashed = await hash(authValue);

    setCookie(headers, {
      name: "user",
      value: userId,
      maxAge: Number(SESSION_LIFETIME),
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
      httpOnly: true
    });

    setCookie(headers, {
      name: "auth",
      value: hashed,
      maxAge: Number(SESSION_LIFETIME),
      sameSite: "Strict", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
      httpOnly: true
    });
  }
  
  async auth() {
    const cookies = getCookies(this.request.headers);
    const authValue = `${cookies.user}:${SESSION_KEY}`;
    const hashed = await hash(authValue);
    
    return hashed === cookies.auth;
  }

  clear(headers: Headers) {
    const url = new URL(this.request.url);
    deleteCookie(headers, "user", { path: "/", domain: url.hostname });
    deleteCookie(headers, "auth", { path: "/", domain: url.hostname });
  }
  
}
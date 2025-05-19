#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
// deno-lint-ignore no-unused-vars
import { db } from "./services/database.ts";

import "$std/dotenv/load.ts";

// await db.clear(); -- use to purge data on startup

await dev(import.meta.url, "./main.ts", config);

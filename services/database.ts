import { Settings, Invitee, Model, User } from "../shared/types.ts";

// https://github.com/denoland/deno/issues/18965
// https://github.com/denoland/saaskit/blob/main/utils/db.ts

export const kv = await Deno.openKv();

export class EntryTransformations<T extends Model> {
  create!: (entry: T, id: number) => void;
}

export class Dataset<T extends Model> {
  name: string;
  transform?: EntryTransformations<T>;

  constructor(name: string, transform?: EntryTransformations<T>) {
    this.name = name;
    this.transform = transform;
  }

  async add(entry: T): Promise<void> {
    const u64 = new Deno.KvU64(1n);
    const countKey = [this.name + '_count'];
    const count = Number((await kv.get(countKey)).value ?? 0);
    this.transform?.create(entry, count);
    const key = [this.name, entry.id];

    await kv.atomic()
      .check({ key, versionstamp: null })
      .set(key, entry)
      .sum(countKey, u64.value) // count incremented by one
      .commit();
  }

  async delete(id: number | string): Promise<void> {
    const key = [this.name, id];
    await kv.delete(key);
  }

  async find(id: number | string): Promise<T | null> {
    const key = [this.name, id];
    const entry = await kv.get(key);
    if (entry.versionstamp === null)
      return null;

    const item = entry.value as T;
    item.id = entry.key[entry.key.length - 1] as number | string;
    return item;
  }

  async all(): Promise<T[]> {
    const items: T[] = [];
    const entries = kv.list({ prefix: [this.name] });

    for await (const entry of entries) {
      const item = entry.value as T;
      item.id = entry.key[entry.key.length - 1] as number | string;
      items.push(item);
    }

    return items;
  }
}

export class Record<T> {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  async clear(): Promise<void> {
    const key = [this.name];
    await kv.delete(key);
  }

  async get(): Promise<T | null> {
    const key = [this.name];
    const entry = await kv.get(key);
    if (entry.versionstamp === null)
      return null;

    return entry.value as T;
  }

  async update<T extends object>(data: T): Promise<void>{
    const key = [this.name];
    const entry = await kv.get(key);

    // Create new of not existing
    if (entry.versionstamp === null) {
      await kv.set(key, data);
      return;
    }
    
    // Update existing, but only props that are in payload
    const record = entry.value as T;
    Object.assign(record, data);

    console.log('Update:', record, data)

    await kv.atomic()
      .check(entry)
      .set(key, record)
      .commit();
  }
}

export class Database {
  
  clear = async () => {
    const entries = kv.list({ prefix: [] });
    for await (const entry of entries) {
      await kv.delete(entry.key);
    }
  };
  users: Dataset<User> = new Dataset<User>(
    "users",
    {
      create: (entry) => {
        entry.id = entry.id ?? crypto.randomUUID();
        entry.createdAt = Date.now();
      }
    },
  );
  invitees: Dataset<Invitee> = new Dataset<Invitee>(
    "invitees",
    {
      create: (entry, id) => {
        entry.id = id;
        entry.registeredAt = Date.now();
      }
    },
  );
  settings: Record<Settings> = new Record<Settings>(
    "settings",
  );
}

export const db =  new Database();
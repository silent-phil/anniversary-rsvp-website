export const api = {
  get: async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    return res.json();
  },
  post: async (url: string, data: object) => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (url: string, data: object) => {
    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
  delete: async (url: string, id: number | string) => {
    await fetch(url + "/" + id, {
      method: "DELETE"
    });
  },
};

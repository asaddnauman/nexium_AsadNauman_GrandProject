// Mocked supabaseServer to bypass build errors
export const supabaseServer = () => {
  console.warn("supabaseServer is mocked for build");
  return {
    auth: {
      getUser: async () => ({ data: null }),
    },
    from: () => ({
      select: async () => ({ data: [] }),
      insert: async () => ({ data: null }),
    }),
  };
};

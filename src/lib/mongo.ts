// Mocked MongoDB file to bypass build errors

export const db = {
  collection: () => ({
    insertOne: async () => ({ acknowledged: true }),
  }),
};

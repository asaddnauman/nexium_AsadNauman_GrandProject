import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { pdfBase64, email } = req.body;

  try {
    await client.connect();
    const db = client.db("resumeTailor");
    const collection = db.collection("resumes");

    await collection.insertOne({ email, pdfBase64, createdAt: new Date() });

    res.status(200).json({ message: "Saved to MongoDB" });
  } catch (error) {
    console.error("MongoDB error:", error);
    res.status(500).json({ error: "Failed to save to MongoDB" });
  }
}

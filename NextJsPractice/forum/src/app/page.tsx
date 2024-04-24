import { connectDB } from "@/database";

export default async function Home() {
    const client = await connectDB;
    const db = client.db("NextForum");
    let data: any = await db.collection("posts").find().toArray();

    return (
        <main>
            {data}
        </main>
    );
}

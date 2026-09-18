// DEV MOCKUP ONLY — King Louie images are copyrighted and must be replaced before go-live
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { products } from "./schema";
import { eq } from "drizzle-orm";

const sqlite = new Database("./shop.db");
const db = drizzle(sqlite);

const IMAGES = [
  { id: 1, url: "https://kinglouie.com/cdn/shop/files/10991549_1.jpg?v=1783090571" },
  { id: 2, url: "https://kinglouie.com/cdn/shop/files/10685240_1.jpg?v=1783090571" },
  { id: 3, url: "https://kinglouie.com/cdn/shop/files/10971001_1.jpg?v=1783090549" },
  { id: 4, url: "https://kinglouie.com/cdn/shop/files/10867001_1.jpg?v=1783090539" },
  { id: 5, url: "https://kinglouie.com/cdn/shop/files/10933001_1.jpg?v=1783090505" },
  { id: 6, url: "https://kinglouie.com/cdn/shop/files/10337439_1.jpg?v=1770982481" },
];

for (const { id, url } of IMAGES) {
  db.update(products).set({ imageUrl: url }).where(eq(products.id, id)).run();
  console.log(`Updated product ${id}`);
}

console.log("Done.");

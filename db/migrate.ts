import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { products } from "./schema";

const sqlite = new Database("./shop.db");
sqlite.pragma("journal_mode = WAL");
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "./db/migrations" });

const existing = db.select().from(products).all();
if (existing.length === 0) {
  db.insert(products)
    .values([
      {
        name: "Silk Cascade Evening Gown",
        description:
          "Floor-length pure silk gown in midnight navy. The front panel conceals a built-in bib layer in matching silk — invisible to onlookers, indispensable in practice. Adjustable back closure.",
        price: 389.0,
        imageUrl: "",
        stock: 8,
      },
      {
        name: "Venetian Lace Dress",
        description:
          "Ivory Italian lace over a satin lining. The integrated bib is crafted from the same lace so it flows seamlessly with the bodice. Perfect for formal occasions.",
        price: 295.0,
        imageUrl: "",
        stock: 12,
      },
      {
        name: "Merino Wrap Day Dress",
        description:
          "Softly structured wrap dress in fine merino wool, available in burgundy and forest green. The inner bib panel is removable and machine washable while the outer dress stays pristine.",
        price: 198.0,
        imageUrl: "",
        stock: 20,
      },
      {
        name: "Velvet Soirée Midi",
        description:
          "Rich crushed velvet midi dress with a sweetheart neckline. An internal snap-on bib in matching velvet protects without altering the silhouette. Invisible zip at the back.",
        price: 245.0,
        imageUrl: "",
        stock: 15,
      },
      {
        name: "Crêpe de Chine Shift",
        description:
          "A timeless shift dress in French crêpe de chine — versatile from office to dinner. The front bib is woven into a hidden interior layer, adding zero bulk to the clean lines.",
        price: 175.0,
        imageUrl: "",
        stock: 25,
      },
      {
        name: "Garden Party Chiffon Dress",
        description:
          "Flowy tiered chiffon in soft blush. The built-in silk bib sits behind the first tier of fabric, keeping the airy, layered look completely intact.",
        price: 220.0,
        imageUrl: "",
        stock: 18,
      },
    ])
    .run();
  console.log("Seeded products.");
}

console.log("Migration complete.");

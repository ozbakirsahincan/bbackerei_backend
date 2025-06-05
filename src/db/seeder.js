import { db } from "./index.js";
import { roles } from "../models/role.js";
import { categories } from "../models/category.js";
import { users } from "../models/user.js";
import { products } from "../models/product.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function seedInitialData() {
  // Seed roles
  const roleCount = await db.select().from(roles);
  if (roleCount.length === 0) {
    await db.insert(roles).values([
      {
        name: "admin",
        description: "admin can do it all crud operations",
      },
      {
        name: "supervisor",
        description:
          "supervisor can only create read and update , cannot delete operations",
      },
      {
        name: "clerk",
        description: "clerk can only create and read operations",
      },
    ]);
    console.log("✅ Roles eklendi.");
  }

  // Seed categories
  const categoryCount = await db.select().from(categories);
  if (categoryCount.length === 0) {
    await db
      .insert(categories)
      .values([
        { title: "Brot" },
        { title: "Pizza" },
        { title: "Gebacken" },
        { title: "Börek" },
      ]);
    console.log("✅ Categories eklendi.");
  }

  // Seed admin user
  const adminExists = await db
    .select()
    .from(users)
    .where(eq(users.username, "admin"))
    .limit(1);

  if (adminExists.length === 0) {
    const hashedPassword = await bcrypt.hash("admin", 10);
    // admin rolünün ID'sini bul
    const [adminRole] = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "admin")) // ✅
      .limit(1);

    await db.insert(users).values({
      username: "admin",
      password: hashedPassword,
      role_id: adminRole.id,
      is_active: true,
    });

    console.log("✅ Admin kullanıcısı oluşturuldu (admin / admin)");
  }

  // Seed products
  const productCount = await db.select().from(products);
  if (productCount.length === 0) {
    await db.insert(products).values({
      name: "Weis Brot",
      description: "Normal Weis Brot",
      price: 2,
      image_url: "/assets/products/brot.jpg",
      category_id: 1,
    });
    console.log("✅ Ürünler eklendi.");
  }
}

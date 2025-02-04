const { PrismaClient, ROLE } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Hashear contraseña para el administrador
  const hashedPassword = await bcrypt.hash("admin", 10);

  // Crear el usuario admin
  const adminUser = await prisma.users.create({
    data: {
      nombre: "Administrator",
      usuario: "admin",
      correo : "admin@admin.com",
      clave: hashedPassword,
      role: ROLE.SUPERADMIN
    },
  });

  console.log("Seed data created:", { adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

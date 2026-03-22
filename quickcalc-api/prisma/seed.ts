import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create initial admin operator
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  const admin = await prisma.opr_operators.upsert({
    where: { opr_email: 'admin@lv.com' },
    update: {},
    create: {
      opr_full_name: 'Administrator',
      opr_email: 'admin@lv.com',
      opr_password_hash: hashedPassword,
      opr_role: 'ADMIN',
      opr_is_active: true,
    },
  });

  console.log('✅ Admin operator created:', {
    email: admin.opr_email,
    role: admin.opr_role,
  });

  // Create test operator
  const operatorPassword = await bcrypt.hash('Operator123!', 10);

  const operator = await prisma.opr_operators.upsert({
    where: { opr_email: 'operator@lv.com' },
    update: {},
    create: {
      opr_full_name: 'Test Operator',
      opr_email: 'operator@lv.com',
      opr_password_hash: operatorPassword,
      opr_role: 'OPERATOR',
      opr_is_active: true,
    },
  });

  console.log('✅ Test operator created:', {
    email: operator.opr_email,
    role: operator.opr_role,
  });

  console.log('\n🎉 Seeding completed!');
  console.log('\n📝 Default credentials:');
  console.log('   Admin:');
  console.log('   - Email: admin@lv.com');
  console.log('   - Password: Admin123!');
  console.log('\n   Operator:');
  console.log('   - Email: operator@lv.com');
  console.log('   - Password: Operator123!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

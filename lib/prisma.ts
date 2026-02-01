
import { PrismaClient } from "@prisma/client";

// Using globalThis instead of global to fix the "Cannot find name 'global'" error in TypeScript environments.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          // Extract tenantId from a global context or specific async storage
          // For the sake of this implementation, we assume the tenantId is passed 
          // or available in the execution context.
          const tenantId = process.env.CURRENT_TENANT_ID || "tenant-alpha";

          // Automatically apply tenantId filter to all find operations
          if (['findMany', 'findFirst', 'findUnique', 'count'].includes(operation)) {
            args.where = { ...args.where, tenantId };
          }

          // Automatically inject tenantId on create
          if (operation === 'create') {
            args.data = { ...args.data, tenantId };
          }

          return query(args);
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma as any;

import { inngest } from "@/inngest/client";
import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
  premiumProcedure,
} from "../init";
import { prisma } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { workflowsRouter } from "@/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

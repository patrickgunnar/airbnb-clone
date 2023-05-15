/* NOT BE AFFECTED TO THE NEXTJS HOT RELOAD */
/*   BEST PRACTICE WITH PRISMA AND NEXT13   */
import { PrismaClient } from "@prisma/client";

// global declaretion
declare global {
    var prisma: PrismaClient | undefined
}

// client receives global prisma
// if not global prisma
// client receives new prisma client
const client = globalThis.prisma || new PrismaClient()

// if not prodution
// global prisma receives client
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client

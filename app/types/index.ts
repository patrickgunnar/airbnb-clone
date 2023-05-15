import { User } from '@prisma/client'


// safe user to be used on navbar type
// replace the Date type to string type
export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

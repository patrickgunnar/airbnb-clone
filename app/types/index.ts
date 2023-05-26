import { Listing, Reservation, User } from '@prisma/client'


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

// safe listing type
// replace the Date type to string type
export type SafeListing = Omit<
    Listing, 'createdAt'
> & {
    createdAt: string
}

// safe reservation type
// replace the Date type to string type
export type SafeReservation = Omit<
    Reservation,
    'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string
    startDate: string
    endDate: string
    listing: SafeListing
}

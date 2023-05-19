import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";


const font = Nunito({ subsets: ["latin"] });

export const metadata = {
    title: "Airbnb",
    description: "Airbnb clone app",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // get current user if exists one
    const currentUser = await getCurrentUser()

	// render elements
    // toaster 
    // rent modal
    // login modal
    // registration modal
    // navbar - passing current user (user or null)
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <RentModal />
                <LoginModal />
                <RegisterModal />
				<Navbar currentUser={currentUser} />
				<div className="pb-20 pt-28">
                    {children}
                </div>
			</body>
        </html>
    );
}

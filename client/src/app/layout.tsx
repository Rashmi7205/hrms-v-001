import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { dark, neobrutalism } from "@clerk/themes";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
      }}
    >
      <html lang="en">
        <body>
          {children}
          <SignedOut>{/* <SignInButton /> */}</SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}

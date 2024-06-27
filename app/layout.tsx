import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    initialScale: 1,
    width: "device-width",
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    title: "AI Image Apparel",
    description: "Hoodies, T-shirts, Mugs, and more!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${inter.className} flex h-full flex-col`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="flex flex-1 flex-col items-center space-y-4 py-8 lg:justify-center lg:py-16">
                        <div id="heading">
                            <CardTitle>AI Image Apparel</CardTitle>
                        </div>
                        {children}
                    </main>
                    <footer className="mt-auto w-full">
                        <CardFooter className="p-0">
                            <Button
                                asChild
                                className="focus:shadow-outline w-full rounded-none px-4 py-2 focus:outline-none"
                            >
                                <Link href="mailto:ai-personalised-gifts@mail.com">
                                    Contact us at ai-personalised-gifts@mail.com
                                </Link>
                            </Button>
                        </CardFooter>
                    </footer>
                </ThemeProvider>
            </body>
        </html>
    );
}

import React from "react";
import "@/css/globals.css"
import {Providers} from "@/redux/provider";
import {Toaster} from "react-hot-toast";

export const metadata = {
    title: 'Thought Pocket',
    description: 'Your notes, your thoughts, your pocket.',
    keywords: [
        'ThoughtPocket',
        'Thought Pocket',
        'Thought',
        'Pocket',
        'Notes',
        "Notion",
        "Next.js"
    ],
    authors: [
        {
            name: "Kutaui",
            url: "https://www.kutaybekleric.com/"
        },],
    creator: "Kutaui",
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
    icons: {
        icon: "/logo-light.png"
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (

        <html lang="en">
        <body>
        <Toaster/>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>

    )
}

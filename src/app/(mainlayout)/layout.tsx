import React from "react";
import Navbar from "@/components/Navbar";
import "@/css/globals.css"


export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="max-w-[1444px] mx-auto">
            <Navbar/>
            {children}
        </div>

    )
}

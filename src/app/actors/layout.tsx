import React from "react";
import Header from "@/shared/ui/Header";

export default function ActorsLayout({
    children,   
}: {children: React.ReactNode;

}) {
    const routes = [
        { name: "Actors", path: "/actors" },
    ];
    return (
        <div>
            <Header routes={routes} />
            <main className="flex-grow">
                {children}{" "}
            </main>
        </div>
    );
}
import React from "react";

export default function ActorsLayout({
    children,   
}: {children: React.ReactNode;

}) {
    return (
        <main className="flex-grow">
            {children}{" "}
        </main>
    );
}
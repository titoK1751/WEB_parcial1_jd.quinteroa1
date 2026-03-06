import React from "react";

export default function MoviesLayout({
    children,   
}: {children: React.ReactNode;

}) {
    return (
        <main className="flex-grow">
            {children}{" "}
        </main>
    );
}
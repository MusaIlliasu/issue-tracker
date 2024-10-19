"use client";

import { Status } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Filtering = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const statusOptions: { label: string; value?: Status }[] = [
            { label: "All" },
            { label: "Open", value: "OPEN"},
            { label: "In Progress", value: "IN_PROGRESS"},
            { label: "Closed", value: "CLOSED"}
        ];
    const searchParams = useSearchParams();
    const orderBy = searchParams.get("orderBy");
   
    return (
        <div tabIndex={0} onBlur={() => setTimeout(() => setShowOptions(false), 200)} 
            className="inline-block min-w-max border border-blue-600 cursor-pointer py-1 px-4"
            onClick={() => setShowOptions(!showOptions)}
        >
            <span>Filter By: {selectedStatus || "All"}</span>

            {
                showOptions ? (
                    <ul className="w-full min-w-max border bg-white absolute top-9 left-0 z-10">
                        {
                            statusOptions.map(statusOption => (
                                <li key={statusOption.label} onClick={() => setSelectedStatus(statusOption.label || "")}>
                                    <Link href={{ 
                                        query: { status: statusOption.value, orderBy }
                                    }} className="block min-w-max hover:bg-gray-100 transition-colors cursor-pointer mb-1 py-1 px-2">
                                        {statusOption.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                ) : null
            }
        </div>
    )
}

export default Filtering;
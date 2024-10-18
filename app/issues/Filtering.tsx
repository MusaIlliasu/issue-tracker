"use client";

import { Status } from "@prisma/client";
import { useState } from "react";

const Filtering = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [selected, setSelected] = useState("");
    const options: { label: string; value?: Status }[] = [
            { label: "All" },
            { label: "Open", value: "OPEN"},
            { label: "In Progress", value: "IN_PROGRESS"},
            { label: "Closed", value: "CLOSED"}
        ];

  return (
    <div tabIndex={0} onBlur={() => setTimeout(() => setShowOptions(false), 200)} 
        className="inline-block min-w-max border border-blue-600 cursor-pointer py-1 px-4"
        onClick={() => setShowOptions(!showOptions)}
    >
        <span>Filter By: {selected || "All"}</span>

        {
            showOptions ? (
                <ul className="min-w-max border bg-white absolute top-9 left-0 z-10">
                    {
                        options.map(option => (
                            <li key={option.label} onClick={() => setSelected(option.label || "")} 
                                className="hover:bg-gray-100 transition-colors cursor-pointer mb-1 py-1 px-2"
                            >{option.label}</li>
                        ))
                    }
                </ul>
            ) : null
        }
    </div>
  )
}

export default Filtering;
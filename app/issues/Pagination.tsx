"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    pageSize: number;
    currentPage: number;
    itemCount: number;
}

const Pagination = ({ pageSize, currentPage, itemCount }: Props) => {
    const totalPages = Math.ceil(itemCount / pageSize);
    const searchParams = useSearchParams();
    const router = useRouter();

    if(totalPages <= 1){ return null; }

    const handleChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push("?" + params.toString());
    }

    return (
        <div className="flex justify-end items-center gap-4">
            <p>Page {currentPage} of {totalPages}</p>

            <div className="flex justify-end items-center gap-3">
                <button disabled={currentPage === 1} onClick={() => handleChange(currentPage - 1)} className="bg-blue-500 text-white rounded hover:bg-blue-600 py-1 px-3 transition-colors">Previous</button>
                <button disabled={currentPage === totalPages} onClick={() => handleChange(currentPage + 1)} className="bg-blue-500 text-white rounded hover:bg-blue-600 py-1 px-3 transition-colors">Next</button>
            </div>
        </div>
    )
}

export default Pagination;
"use client";

interface Props {
    pageSize: number;
    currentPage: number;
    itemCount: number;
}

const Pagination = ({ pageSize, currentPage, itemCount }: Props) => {
    const totalPages = Math.ceil(itemCount / pageSize);

    if(totalPages <= 1){ return null; }

    return (
        <div className="flex justify-end items-center gap-4">
            <p>Page {currentPage} of {totalPages}</p>

            <div className="flex justify-end items-center gap-3">
                <button disabled={currentPage === 1} className="bg-blue-500 text-white rounded hover:bg-blue-600 py-1 px-3 transition-colors">Previous</button>
                <button disabled={currentPage === totalPages} className="bg-blue-500 text-white rounded hover:bg-blue-600 py-1 px-3 transition-colors">Next</button>
            </div>
        </div>
    )
}

export default Pagination;
"use client";

import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const DeleteButton = ({ id }: { id: number }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Delete Confirmation Modal */}
            <ConfirmationModal 
                show={showModal}
                issueId={id}
                handleClose={() => setShowModal(false)}
            />

            <button onClick={() => setShowModal(true)} className="rounded py-2 px-4 bg-red-500 hover:bg-red-600 text-white transition-colors">Delete</button>
        </>
    )
}

export default DeleteButton
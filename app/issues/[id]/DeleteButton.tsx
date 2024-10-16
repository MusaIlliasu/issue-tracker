"use client";

import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: number }) => {
    const [showModal, setShowModal] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    
    const handleShowModal = () => {
        if(status === "unauthenticated"){ 
            return router.push("/api/auth/signin");
        }
        
        setShowModal(true);
    }

    return (
        <>
            {/* Delete Confirmation Modal */}
            <ConfirmationModal 
                show={showModal}
                issueId={id}
                handleClose={() => setShowModal(false)}
            />

            <button onClick={handleShowModal} className="rounded py-2 px-4 bg-red-500 hover:bg-red-600 text-white transition-colors">Delete</button>
        </>
    )
}

export default DeleteButton;
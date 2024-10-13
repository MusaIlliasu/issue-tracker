/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    show: boolean;
    issueId: number;
    handleClose: () => void;
}

const ConfirmationModal = ({show, issueId, handleClose}: Props) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDeleteIssue = async () => {
        console.log("Id: ", issueId);
        if(loading){ return; }

        try {
            setLoading(true);
            const { data } = await axios.delete(`/api/issues/${issueId}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(data);
            setLoading(false);
            if(data.status){
                return router.push("/issues");
            }
            
            return setError(data.message || data.error);
            
        } catch (error: any) {
            console.log(error.response);
            setLoading(false);
            return setError(error.response ? error.response.data?.error : error.message || error.response.statusText);
        }
    }

    return (
        <div className={`${show ? "block" : "hidden"} w-full h-screen bg-[#333333CC] fixed top-0 left-0 flex justify-center items-center p-6 z-[100] transition-all`}>
            <div className="w-full md:w-[400px] min-h-[100px] bg-white text-[#333333] rounded p-6">
                <h2 className="font-semibold text-center text-xl mb-6">Did you want to delete this issue?</h2>
                
                <div className="flex justify-center items-center gap-4 flex-wrap text-xs mb-4">
                    <button onClick={handleDeleteIssue} className="rounded py-2 px-4 bg-red-500 hover:bg-red-600 text-white transition-colors flex justify-center items-center gap-1">
                        <span>Delete</span>
                        {loading ? <span className="inline-block w-[16px] h-[16px] border-2 border-white border-b-transparent rounded-full animate-spin"></span> : null}
                    </button>
                    <button onClick={handleClose} className="rounded py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white transition-colors">Cancel</button>
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </div>
        </div>
    )
}

export default ConfirmationModal;
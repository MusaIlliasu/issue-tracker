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
        if(loading){ return; }

        try {
            setLoading(true);
            const { data } = await axios.delete(`/api/issues/${issueId}`);
            setLoading(false);
            if(data.status){
                router.push("/issues");
                router.refresh();
                return;
            }
            
            return setError(data.message || data.error);
            
        } catch (error: any) {
            setLoading(false);
            return setError(error.response ? error.response.data?.error || error.response.statusText  : error.message);
        }
    }

    return (
        <div className={`${show ? "block" : "hidden"} w-full h-screen bg-[#333333CC] fixed top-0 left-0 flex justify-center items-center p-6 z-[100] transition-all`}>
            <div className="w-full md:w-[400px] min-h-[100px] bg-white text-[#333333] rounded p-6">
                {
                    !error ? (
                        <>
                            <h2 className="font-semibold text-center text-xl mb-6">Did you want to delete this issue?</h2>
                            
                            <div className="flex justify-center items-center gap-4 flex-wrap text-xs">
                                <button onClick={handleDeleteIssue} className="rounded py-2 px-4 bg-red-500 hover:bg-red-600 text-white transition-colors flex justify-center items-center gap-1">
                                    <span>Delete</span>
                                    {loading ? <span className="inline-block w-[16px] h-[16px] border-2 border-white border-b-transparent rounded-full animate-spin"></span> : null}
                                </button>
                                <button onClick={handleClose} className="rounded py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white transition-colors">Cancel</button>
                            </div>
                        </>

                    ) : (
                        <>
                            <h2 className="font-semibold text-center text-xl mb-6">{error}</h2>
                            <div className="text-center">
                                <button onClick={handleClose} className="rounded py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white transition-colors">Ok</button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ConfirmationModal;
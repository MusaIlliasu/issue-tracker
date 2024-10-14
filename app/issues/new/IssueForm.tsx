"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Issue } from "@prisma/client";
import { useState } from "react";
import Spinner from "../[id]/Spinner";

interface FormProps {
    title: string;
    description: string;
}

interface Props {
    issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormProps>();
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onFormSubmit: SubmitHandler<FormProps> = async (formData) => {
        if(loading){ return; }

        try {
            setLoading(true);
            if(issue){
                const { data } = await axios.patch(`/api/issues/${issue.id}`, formData);
                setLoading(false);
                if(data.status){
                    router.push(`/issues/${issue.id}`);
                    return router.refresh();
                }
                return setError(data.message);
            }

            const { data } = await axios.post("/api/issues", formData);
            if(data.status){ 
                router.push("/issues");
                return router.refresh();
            }

            setLoading(false);
            setError(data?.errors.join(", "));
        } catch (error: any) {
            setLoading(false);
            setError(error.response ? error.response?.data?.error || error.response?.statusText : error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-full md:w-[500px] border rounded mx-auto p-4 md:p-8">
            <h2 className="text-center mb-5">{issue ? "Update Bug" : "Create New Bug"}</h2>
            <div className="mb-5">
                <label htmlFor="title" className="w-full mb-1">Title</label>
                <input type="text" id="title"
                    className="w-full border outline-none rounded py-2 px-3"
                    placeholder="Enter Title"
                    defaultValue={issue?.title}
                    {...register("title", {required: true})}
                    required
                />
                {errors.title ? <p className="text-red-500 mt-1">Title field is required</p> : null}
            </div>

            <div className="mb-5">
                <Controller
                    name="description"
                    defaultValue={issue?.description}
                    control={control}
                    render={ ({field}) => <SimpleMDE placeholder="Enter Bug Description" {...field} /> }
                    rules={{required: true}}
                />
                {errors.description ? <p className="text-red-500 mt-1">Description field is required</p> : null}
            </div>

            {
                error ? (
                    <div className="text-red-600 text-sm mb-5">{error}</div>
                ) : null
            }

            <div>
                <button className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-full py-2 px-4 transition-colors flex justify-center items-center gap-1">
                    <span>{issue ? "Update" : "Submit"}</span>
                    {loading ? <Spinner /> : null}
                </button>
            </div>
        </form>
    )
}

export default IssueForm;
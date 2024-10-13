"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormProps {
    title: string;
    description: string;
}

const CreateIssue = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormProps>();
    const router = useRouter();

    const onFormSubmit: SubmitHandler<FormProps> = async (formData) => {

        try {
            const { data } = await axios.post("/api/issues", formData);
            if(data.status){ return router.push("/issues"); }
            console.log(data?.errors.join(", "));
        } catch (error: any) {
            console.log(error.response ? error?.response?.data?.error : error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-full md:w-[500px] border rounded mx-auto p-4 md:p-8">
            <h2 className="text-center mb-5">Create New Bug</h2>
            <div className="mb-5">
                <label htmlFor="title" className="w-full mb-1">Title</label>
                <input type="text" id="title"
                    className="w-full border outline-none rounded py-2 px-3"
                    placeholder="Enter Title"
                    {...register("title", {required: true})}
                    required
                />
                {errors.title ? <p className="text-red-500 mt-1">Title field is required</p> : null}
            </div>

            <div className="mb-5">
                <Controller
                    name="description"
                    control={control}
                    render={ ({field}) => <SimpleMDE placeholder="Enter Bug Description" {...field} /> }
                    rules={{required: true}}
                />
                {errors.description ? <p className="text-red-500 mt-1">Description field is required</p> : null}
            </div>

            <div>
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full py-2 px-4 transition-colors">Submit</button>
            </div>
        </form>
    )
}

export default CreateIssue;
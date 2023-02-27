'use client'

import { useState } from "react"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import toast from 'react-hot-toast'

export default function AddPost() {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    let toastPostID: string


    //create a post
    const { mutate } = useMutation(
        async (title: string) => await axios.post('/api/posts/addPost', {title}),
         {
            onError: (error) => {
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message, {id : toastPostID})
                }
                setIsDisabled(false)
            },
            onSuccess : (data) => {
                toast.success('Post has been made 🎉', {id : toastPostID})
                setTitle("")
                setIsDisabled(false)
            }
        }
    )

    const submitPost = async(e: React.FormEvent) =>{
        e.preventDefault();
        toastPostID = toast.loading("Creating your post", {id : toastPostID})
        setIsDisabled(true)
        mutate(title)
    }

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md shadow-md">
            <div className="flex flex-col my-4">
                <textarea 
                onChange={(e) => setTitle(e.target.value)} 
                name="title" 
                placeholder="What's on your mind"
                value={title}
                className="bg-gray-200 shadow-sm p-4 rounded-md"
                >
                </textarea>
            </div>
            <div>
                <button
                disabled={isDisabled}
                className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-25"
                type="submit"
                >Post</button>
            </div>
    </form>
  )
}

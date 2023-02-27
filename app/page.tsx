'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AddPost from "./components/AddPost"
import Post from "./components/Post"
import { PostType } from "./types/Posts"
//Fetch all posts
const allPosts = async() => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data;
}

export default function Home() {

  const  {data, error, isLoading} = useQuery<PostType[]>({
    queryFn: allPosts, 
    queryKey: ["posts"]
  })

  if(error) return error;
  if(isLoading)  return "Loading...."

  return (
    <main className="text-lg py-5">
      <AddPost />
      {data?.map((post) => (
          <Post
          comments={post.Comment}
          key={post.id} 
          id={post.id}
          name={post.author.name} 
          avatar={post.author.image} 
          postTitle={post.title} />
      ))}
    </main>
  )
}

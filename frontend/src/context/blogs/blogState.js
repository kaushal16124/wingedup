import { useState } from "react"
import BlogContext from "./blogContext"

const BlogState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST_URI;
    console.log('API Host:', host);
    const initialBlog = []
    const [blogs, setBlogs] = useState(initialBlog)

    //Fetching all Blogs
    const getBlogs = async () => {
        const response = await fetch(`${host}/api/blogs/fetchallblogs`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });



        const res = await response.json()
        setBlogs(res)
    }


    return (
        <BlogContext.Provider value={{ blogs,setBlogs, getBlogs }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;
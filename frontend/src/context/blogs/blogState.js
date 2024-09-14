import { useState } from "react"
import BlogContext from "./blogContext"

const BlogState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST_URI;
    //console.log('API Host:', host);
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

    const postBlog = async (title,description,author)=> {
        let added=false;
        const response = await fetch(`${host}/api/blogs/createblog`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title,description,author})
            
        });
        const res= await response.json();
        if(res.success){
            added=true;
        }
        return added;
    }

    const deleteBlog = async (id) => {
        let deleted = false;
        const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                // Authorization: localStorage.getItem('token')
            }
        });
        const res = await response.json()
        if (res.success) {
            deleted = true;
            const newBlogs = blogs.filter((item) => { return item._id != id })

            setBlogs(blogs);

        }
        return deleted;

    }


    return (
        <BlogContext.Provider value={{ blogs,setBlogs, getBlogs,postBlog,deleteBlog }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;
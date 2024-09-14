import React from 'react';
import './BlogCard.css'; // You can define the styles here

const BlogCard = (props) => {
    const { blog,deleteBlog } = props;
    const handleDelete = async () => {

        const isDeleted = await deleteBlog(blog._id);
        if (isDeleted) {
            props.showAlert("Deleted Successfully", "success");

        } else {
            props.showAlert("Some error occurred", "danger");
            //alert("Some error occurred");
        }

    };

    const truncateHtmlDescription = (htmlText) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlText;
        const textContent = tempElement.textContent || tempElement.innerText || ""; // Get the text from the HTML

        // Truncate to 50 characters
        return textContent.length > 50 ? textContent.substring(0, 50) + '...' : textContent;
    };

    return (
        <div className="blog-card">
            <div className="blog-header">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-author">By {blog.author}</p>
            </div>
            <p>{truncateHtmlDescription(blog.description)}</p>
            {/* <div className="blog-description" dangerouslySetInnerHTML={{ __html: blog.description }} /> */}
            <div className="blog-actions">
                <a className='mx-2 my-2' onClick={()=>{props.showAlert("Bana raha hun abhi", "warning");}}>
                    <i className="fa-regular fa-pen-to-square fa-xl"></i>
                </a>
                <a className='mx-2 my-2' onClick={() => {handleDelete()}}>
                    <i className="fa-solid fa-delete-left fa-xl"></i>
                </a>
            </div>

        </div>
    );
}

export default BlogCard;

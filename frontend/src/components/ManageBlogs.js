import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import './ManageBlogs.css'

const ManageBlogs = (props) => {
  const host = process.env.REACT_APP_BACKEND_HOST_URI;
  const editorRef = useRef(null);
  const [initialHtmlString, setInitialHtmlString] = useState('');
  const [editorData, setEditorData] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [config, setConfig] = useState({});

  // Get token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      console.log('Stored token:', storedToken);
    } else {
      console.error('No token found in localStorage.');
    }
  }, []);

  // Set editor configuration (without uploader)
  useEffect(() => {
    if (token) {
      setConfig({
        readonly: false,
        placeholder: '',
        defaultActionOnPaste: 'insert_as_html',
        defaultLineHeight: 1.5,
        enter: 'div',
        buttons: [
          'bold', 'italic', '|', 'ul', 'ol', '|',
          'font', 'fontsize', '|', 'outdent', 'indent', 'align', '|',
          'hr', '|', 'fullsize', 'brush', '|', 'table', 'link', '|',
          'undo', 'redo'
        ]
      });
    }
  }, [token]);

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // Single image

    try {
      // Send image to backend (API call)
      const response = await axios.post(`${host}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token, // Correct format
        }
      });

      if (response && response.data && response.data.url) {
        // Access editor instance directly from ref
        const editor = editorRef.current;
        if (editor) {
          // Insert image URL into editor content
          console.log('Editor instance available:', editor);
          editor.selection.insertImage(response.data.url);

          // Force update editorData after image insertion
          const updatedContent = editor.getEditorValue();
          console.log('Updated content:', updatedContent);
          setEditorData(updatedContent);
        } else {
          console.error('Editor instance is not available.');
        }
      } else {
        console.error('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const setValue = (htmlString) => {
    setEditorData(htmlString);
  };

  return (
    <div className="container blog-post-page">
      <h1>Post Blogs</h1>
      <div className="editor-container">
        <JoditEditor
          ref={(editorInstance) => {
            editorRef.current = editorInstance;
          }}
          value={initialHtmlString || ''}
          config={config}
          onChange={setValue}
        />
      </div>
      <div className="image-upload-container">
        <label>
          Upload Image :  
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>
      <div className="editor-output-container">
        <h2>Editor Output</h2>
        <div dangerouslySetInnerHTML={{ __html: editorData }} />
      </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={() => console.log(editorData)}>Make this blog LIVE</button>
      </div>
    </div>
  );
};

export default ManageBlogs;

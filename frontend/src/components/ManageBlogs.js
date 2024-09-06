import React, { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';

const ManageBlogs = (props) => {
  //const host = "http://localhost:4001"
  const host = process.env.REACT_APP_BACKEND_HOST_URI;
  const editorRef = useRef(null);
  const [initialHtmlString, setInitialHtmlString] = useState(''); 
  const [editorData, setEditorData] = useState(''); 

  const options = ['bold', 'italic', '|', 'ul', 'ol', '|', 'image', '|', 'font', 'fontsize', '|', 'outdent', 'indent', 'align', '|', 'hr', '|', 'fullsize', 'brush', '|', 'table', 'link', '|', 'undo', 'redo'];

  const config = useMemo(() => ({
    readonly: false,
    placeholder: '',
    defaultActionOnPaste: 'insert_as_html',
    defaultLineHeight: 1.5,
    enter: 'div',
    buttons: options,
    buttonsMD: options,
    buttonsSM: options,
    buttonsXS: options,
    statusbar: false,
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    toolbarAdaptive: false,
    uploader: {
      url: `${host}/api/upload`, // Your backend image upload URL
      format: 'json',
      process: async (files) => {
        const formData = new FormData();
        formData.append('file', files[0]); // Handling single image
        
        console.log('Files:', files);
        //console.log("hello")
        // Sending image to your backend (Cloudinary upload)
        const response = await axios.post(`${host}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token')
          }

        });
    
        //const data = await response.json();
    
        // Handling the response
        if (response && response.url) {
          // Inserting the uploaded image URL into the editor
          editorRef.current.s.insertImage(response.url);
    
          // Return an object with a messages property on success
          return {
            messages: [
              {
                type: 'success',
                text: 'Image uploaded successfully',
              },
            ],
          };
        } else {
          // Return an object with a messages property on error
          return {
            messages: [
              {
                type: 'error',
                text: 'Image upload failed',
              },
            ],
          };
        }
      },
      error: (e) => {
        console.error('Image upload failed:', e);
      },
    },
  }), []);

  const setValue = (htmlString) => {
    setEditorData(htmlString);
  };

  return (
    <div>
      <h1>Editor Page</h1>
      <JoditEditor
        ref={editorRef}
        value={initialHtmlString || ''}
        config={config}
        onChange={(htmlString) => setValue(htmlString)}
      />
      <div>
        <h2>Editor Output</h2>
        <div dangerouslySetInnerHTML={{ __html: editorData }} />
      </div>
      <button onClick={() => { console.log(editorData);}}>Submit</button>
    </div>
  );
}

export default ManageBlogs

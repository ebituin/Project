import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function Editor({value, onChange}){
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean'],
        ],
    };
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'blockquote', 'code-block',
        'link', 'image',
    ];

    return (
        <ReactQuill
            value={value}
            theme="snow"
            onChange={onChange}
            modules={modules}
            formats={formats}
        />
    );
}

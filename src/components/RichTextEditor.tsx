"use client";
import React from "react";
import { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "@/styles/quill.min.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="bg-white rounded-md border border-border"
      />
      <style>{`
        .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          border-color: rgba(0, 0, 0, 0.08);
          background-color: #fafafa;
        }
        .ql-container {
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          border-color: rgba(0, 0, 0, 0.08);
          font <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="bg-white rounded-md border border-border"
        />-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .ql-editor {
          min-height: 200px;
          font-size: 14px;
          line-height: 1.6;
        }
        .ql-editor.ql-blank::before {
          color: #64748b;
          font-style: normal;
        }
        .ql-toolbar button:hover,
        .ql-toolbar button:focus,
        .ql-toolbar button.ql-active {
          color: #16a34a;
        }
        .ql-toolbar button:hover .ql-stroke,
        .ql-toolbar button:focus .ql-stroke,
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #16a34a;
        }
        .ql-toolbar button:hover .ql-fill,
        .ql-toolbar button:focus .ql-fill,
        .ql-toolbar button.ql-active .ql-fill {
          fill: #16a34a;
        }
      `}</style>
    </div>
  );
}

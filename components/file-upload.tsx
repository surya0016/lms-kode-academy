"use client"

import toast from "react-hot-toast";
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthing"

interface FileUploadProps {
  onChange: (url?:string)=>void;
  endpoint: keyof typeof ourFileRouter
}

const FileUpload = ({
  onChange,
  endpoint
}:FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res)=>{
        onChange(res?.[0].url);
        toast.success("File uploaded successfully")
      }}
      onUploadError={(error:Error)=>{
        toast.error(`${error?.message}`)
        console.log(error)
      }}
    />
  )
}

export default FileUpload
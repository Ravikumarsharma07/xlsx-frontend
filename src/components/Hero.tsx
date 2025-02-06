import { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import DataTable from "./DataTable";
import JsonFileContext from "@/context/JsonFileContext";

function Hero() {
  const {jsonFile} = useContext(JsonFileContext)
  const [files, setFiles] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const onDrop = (acceptedFile) => {
    // early return if the file is in other format or more than 2mb
    if (
      acceptedFile[0].type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setErrorMessage("Error: Invalid File Type, please use only .xlsx files");
      return;
    }
    if (acceptedFile[0].size > 2 * 1024 * 1024) {
      setErrorMessage("Error: File size should be less than 2MB");
      return;
    }
    setErrorMessage("");
    if (acceptedFile[0].name) {
      setSelectedFile(`Selected file: ${acceptedFile[0].name}`);
    } else {
      setSelectedFile(``);
    }
    setFiles(prev => acceptedFile[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
  });


  return (
    <>



      <h2 className="text-xl text-center tracking-wide bg-gradient-to-b hover:bg-gradient-to-t from-green-500 to-blue-600 bg-clip-text text-transparent px-[3%] md:px-[5%] mt-6">Convert Excel Into Json</h2>
      <section
        {...getRootProps({ className: "dropzone" })}
        className="w-[96%] md:w-[90%] flex-center gap-5 flex-col rounded-[10px] border-dashed hover:border-blue-400 cursor-pointer border-[#a0a0a0] border-2 place-self-center p-6 mt-2"
      >
        <Upload size={50} className="text-[#6b6b6b]" />
        <input type="file" {...getInputProps()} />
        <div className="text-[#4b4b4b] text-center">
          <h3 className="text-xl font-semibold">
            Drag & drop an Excel file here
          </h3>
          <p className="text-[16px] text-[#4b4b4b] mt-4">
            or click to select file
          </p>
          <p className="text-[14px] text-[#868686] mt-1">
            only .xlsx (Excel files) files, max 2MB
          </p>
        </div>
      </section>
      <p className=" text-blue-400 mt-4 px-[3%] md:px-[5%]">{selectedFile}</p>
      <p className="text-red-500 mt-1 px-[3%] md:px-[5%]">{errorMessage}</p>

      {jsonFile.length > 0 ? <DataTable data={files} /> : ""    }

    </>
  );
}

export default Hero;

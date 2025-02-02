import useToast from "@/hooks/useToast";
import axios from "axios";
import { ArrowDownUp, Loader, Sheet, Trash2 } from "lucide-react";
import "es6-promise/auto";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ErrorModal from "./ErrorModal";

const DataTableHeader = ({
  setIsSheetVisible,
  isSheetVisible,
  currentSheet,
  jsonFile,
  handleSheetChange,
  sheetNamesArr,
}) => {
  const [isImportingData, setIsImpoortingData] = useState(false);
  const [isColumnsError, setIsColumnsError] = useState(false);
  const [columnsError, setColumnsError] = useState([]);

  const [isValidationError, setIsValidationError] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])

  const handleUpload = async () => {
    setIsImpoortingData(true);
    setIsColumnsError(false);
    
    setIsValidationError(false);

    try {
      const response = await axios.post("/api/upload", {
        jsonFile,
        sheetNamesArr,
      });

      // checking for column error, if any return and show the error 
      if (response.data.columnError) {
        setIsColumnsError(true);
        setColumnsError(response.data.columnError);
        return
      }


      useToast(response.data.message || "Successful", true)

      if(response.data.validationErrors){
        setIsValidationError(true)
        setValidationErrors(response.data.validationErrors)
        return
      }

      
      if (response.data.noErrors) {
        useToast("File successfully saved in database", true)
      }
    } catch (error) {
      useToast(error.response.data.message || "Error while uploading files", false);
      console.log(error);
    } finally {
      setIsImpoortingData(false);
    }
  };
  const onClose = () => {
    setIsColumnsError(false);
    setIsValidationError(false)
  };
  return (
    <>
      <header className="flex-between">
        <div
          className="flex gap-5 text-lg cursor-pointer relative h-10"
          onClick={() => setIsSheetVisible(!isSheetVisible)}
        >
          <Sheet className="text-black/50 mt-2" size={16} />
          <div className="flex flex-col">
            <span className={`p-1 px-2`}>Sheet {currentSheet}</span>
            {jsonFile.length > 0 &&
              jsonFile.map((file, index) => {
                return (
                  <span
                    key={index}
                    id={`${index + 1}`}
                    onClick={handleSheetChange}
                    className={`${isSheetVisible ? "visible" : "hidden"} ${
                      currentSheet == index + 1
                        ? "bg-blue-300"
                        : " bg-[#f8f5f5]"
                    } border-b p-1 px-5 border-black`}
                  >
                    Sheet {index + 1}
                  </span>
                );
              })}
          </div>
          <ArrowDownUp className="text-black mt-2" size={20} />
        </div>

        {isImportingData ? (
          <button className="flex-center gap-2 w-[130px] h-max py-2 opacity-80 bg-blue-600 text-lg text-white/80 cursor-not-allowed rounded-[8px]">
            Import <Loader size={15} className="animate-spin" />
          </button>
        ) : (
          <button
            onClick={handleUpload}
            className="h-max w-[130px] py-2 px-10 bg-blue-500 hover:bg-blue-600 text-xl text-white rounded-[8px]"
          >
            Import
          </button>
        )}
      </header>


        <ErrorModal open={isValidationError} onClose={onClose} errors={validationErrors}/>

        {/* modal  for showing mandatory columns error only */}
      <Dialog open={isColumnsError} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle className="text-red-500">
          Mandatory columns are missing, please add columns before importing
        </DialogTitle>
        <DialogContent>
          <div className="mt-4 ml-4">
            <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-start">Error Description</th>
              </tr>
            </thead>
            <tbody>
              {columnsError?.map((error, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{error.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTableHeader;

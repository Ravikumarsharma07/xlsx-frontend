import useToast from "@/hooks/useToast";
import { ArrowDownUp, Loader, Sheet } from "lucide-react";
import "es6-promise/auto";
import { useState } from "react";

const DataTableHeader = ({
  setIsSheetVisible,
  isSheetVisible,
  currentSheet,
  jsonFile,
  handleSheetChange,
  sheetNamesArr,
}) => {
  const [isImportingData, setIsImpoortingData] = useState(false);

  const handleSownload = async () => {
    setIsImpoortingData(true);
    setTimeout(() => {
    setIsImpoortingData(false);
    useToast("File downloaded", true)
    }, 1000);

    try {
      const jsonString = JSON.stringify(jsonFile, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data.json";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.log(error);
      useToast("Error while converting file", false)
    } 
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
          <button
            onClick={handleSownload}
            className="flex-center gap-2 h-10 w-[130px] py-2 opacity-80 bg-blue-600 text-lg text-white/80 cursor-not-allowed rounded-[8px]"
          >
            <Loader size={22} className="animate-spin" />
          </button>
        ) : (
          <button
            onClick={handleSownload}
            className="w-[130px] h-10 bg-blue-500 hover:bg-blue-600 text-xl text-white rounded-[8px]"
          >
            Convert
          </button>
        )}
      </header>
    </>
  );
};

export default DataTableHeader;

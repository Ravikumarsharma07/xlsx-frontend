import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import * as xlsx from "xlsx";
import DataTableHeader from "./DataTableHeader";
import useToast from "@/hooks/useToast";
import PreviewData from "./PreviewData";
import JsonFileContext from "@/context/JsonFileContext";

const DataTable = ({ data }) => {
  // storing all the sheets in array format inside a array and making a currentSheet for taking reference to render correct sheet

  const {jsonFile, setJsonFile} = useContext(JsonFileContext)
  const [filesToRender, setFilesToRender] = useState([]);
  const [currentSheet, setCurrentSheet] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [columnNames, setColumnName] = useState([]);
  const [sheetNamesArr, setSheetNamesArr] = useState([]);
  
  // ruuning usestate to ensure we have the latest files data
  useEffect(() => {
    setCurrentSheet(1);
    setCurrentPage(1);
    setFilesToRender([])
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      if (!binaryString || !data) return;
      const workbook = xlsx.read(binaryString, { type: "binary" });
      setSheetNamesArr(prev =>workbook.SheetNames);
      const finalData = [];
      workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const parsedData = xlsx.utils.sheet_to_json(sheet);
        finalData.push(parsedData);
      });
      setJsonFile((prev) => finalData);
      console.log(jsonFile);
      
    };
    try {
      reader.readAsArrayBuffer(data);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  //   for getting the columns of sheet and running whenever a user changes sheet number
  useEffect(() => {
    try {
      const columns = Object.keys(jsonFile[currentSheet - 1][0]);
      setColumnName((prev) => columns);
    } catch (error) {
      console.log(error);
      setColumnName([]);
    }

    if(jsonFile[currentPage-1]){
      const tenFiles = []
      for(let i = 0; i < 10; i++){
        if(jsonFile[currentSheet-1][i]){
          tenFiles.push(jsonFile[currentSheet-1][i])
        }
      }
      setFilesToRender(prev => (tenFiles))
    }
  }, [jsonFile, currentSheet]);


  //   handling the user click to change the sheet
  const handleSheetChange = (e: any) => {
    setCurrentSheet((prev) => e.target.id);
    setIsSheetVisible(!isSheetVisible);

    try {
      const columns = Object.keys(jsonFile[Number(e.target.id) - 1][0]);
      setColumnName((prev) => columns);
    } catch (error) {
      console.log(error);
      setColumnName([]);
    }
  };

  // pagination increment 
  const handleIncrement = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(jsonFile[currentSheet - 1].length / 10))
    );
  };
  // pagination decrement
  const handleDecrement = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // this useEffect for selecting 10 files to render on screen 
  useEffect(()=>{
    if(!jsonFile[currentSheet-1]) return    
    if(currentPage == 1){
      const tenFiles = []
      for(let i = 0; i < 10; i++){
        if(jsonFile[currentSheet-1][i]){
          tenFiles.push(jsonFile[currentSheet-1][i])
        }
      }
      setFilesToRender(prev => (tenFiles))
    }else{ 
      const tenFiles = []
      let start = (currentPage-1) * 10
      
      for (let i = start; i < start+10; i++) {
        if(jsonFile[currentSheet-1][i]){
          tenFiles.push(jsonFile[currentSheet-1][i])
        }
      }
      setFilesToRender(tenFiles)
    }
  }, [currentPage])


  // handling delete row 
  const handleDelete = (e:any) => {
    // finding index to delete the filw from sheet
    const index = jsonFile[currentSheet-1].findIndex((obj:{__rowNum__:number}) => obj.__rowNum__ == e.target.id);
    if (index !== -1){
      jsonFile[currentSheet-1].splice(index, 1);
      const remainingRows = filesToRender.filter((obj:{__rowNum__:number})=> obj.__rowNum__ != e.target.id)
      setFilesToRender(remainingRows)
      useToast(`successfully deleted row no.${e.target.id}`, true)
    }else{
      useToast("error while deleting row", false)
    } 
  }  


  return (
    <section className="w-[96%] md:w-[90%] my-5 mb-14 p-6 place-self-center shadow-2xl rounded-xl bg-white">
      {/* data table header  */}
      <DataTableHeader
        sheetNamesArr={sheetNamesArr}
        handleSheetChange={handleSheetChange}
        jsonFile={jsonFile}
        currentSheet={currentSheet}
        isSheetVisible={isSheetVisible}
        setIsSheetVisible={setIsSheetVisible}
      />

        {/*  ##########    data in tabular form here    ###########  */}
      <PreviewData handleDelete={handleDelete} filesToRender={filesToRender} columnNames={columnNames} />

      {/* pagination controls here  */}
      <footer className="px-2 mt-4 flex-between">
        <p className="text-black">
          Page {currentPage} of{" "}
          {jsonFile[currentSheet - 1] &&
            Math.ceil(jsonFile[currentSheet - 1].length / 10)}
        </p>
        <div className="text-[#3b3b3b] flex-center gap-5">
          <ArrowLeftCircle
            onClick={handleDecrement}
            className="hover:text-black cursor-pointer"
          />{" "}
          <ArrowRightCircle
            onClick={handleIncrement}
            className="hover:text-black cursor-pointer"
          />
        </div>
      </footer>
    </section>
  );
};

export default DataTable;

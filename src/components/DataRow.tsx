import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";


const DataRow = ({ data, columns, handleDelete}: any) => {  
  const values = [];
  for (let key in data) {
    values.push(data[key]);
  }
  

  return (
    <>
      <div
        className={`text-lg grid grid-flow-col w-max min-w-full border-b border-[#8a8a8a] py-3 bg-[white] hover:bg-[#f7f4f4] overflow-x-visible`}
        >
        <p className="text-[16px] pl-3 w-[100px]">{data.__rowNum__+"." || "NA"}</p>
        {values.map((value, index) => { 
          return (
            <>
              <p key={index} className="text-[15px] w-[230px] ">
                {data[columns[index]] || <span className="text-red-500">not found</span>}
              </p>
            </>
          );
        })}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <p className="text-[15px] w-[100px] text-red-500 cursor-pointer">
              <Trash2 className="hover:text-red-600 hover:scale-110 " />
            </p>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white rounded-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-red-600">Delete Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                row.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className=" text-lg rounded-[4px] w-32">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction id={data.__rowNum__} onClick={handleDelete} className="bg-red-500 hover:bg-red-600 border border-red-800 text-[#eeeeee] text-lg rounded-[4px] w-32">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default DataRow;

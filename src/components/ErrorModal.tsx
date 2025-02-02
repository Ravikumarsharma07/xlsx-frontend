import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tab, Tabs } from "@mui/material";


const ErrorModal = ({ open, errors, onClose }) => {
  const [activeSheet, setActiveSheet] = useState(Object.keys(errors)[0] || "");

  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>File Validation Errors</DialogTitle>
      <DialogContent>
        <Tabs
          value={activeSheet}
          onChange={(e, newValue) => setActiveSheet(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {Object.keys(errors).map((sheet) => (
            <Tab key={sheet} label={sheet} value={sheet} />
          ))}
        </Tabs>
        <div className="mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Row No.</th>
                <th className="border border-gray-300 px-4 py-2">Error Description</th>
              </tr>
            </thead>
            <tbody>
              {errors[activeSheet]?.map((error, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{error.row}</td>
                  <td className="border border-gray-300 px-4 py-2">{error.message}</td>
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
  );
};

export default ErrorModal;

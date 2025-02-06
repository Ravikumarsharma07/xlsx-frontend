import { useContext } from "react";
import { Button } from "./ui/button";
import JsonFileContext from "@/context/JsonFileContext";

const sampleData = [
  [
    {
      Name: "Amit Sharma",
      Amount: 12000.5,
      Date: "01-02-2025",
      Verified: "Yes",
      __rowNum__: 1,
    },
    {
      Name: "Priya Verma",
      Amount: 5500.75,
      Date: "05-02-2025",
      Verified: "No",
      __rowNum__: 2,
    },
    {
      Name: "Rahul Gupta",
      Amount: -1000,
      Date: "15-01-2025",
      Verified: "Yes",
      __rowNum__: 3,
    },
    {
      Name: "Neha Jain",
      Amount: 2300,
      Date: "20-02-2025",
      Verified: "No",
      __rowNum__: 4,
    },
    {
      Name: "Vikas Singh",
      Amount: 8000.25,
      Date: "28-02-2025",
      Verified: "Yes",
      __rowNum__: 5,
    },
  ],
];

sampleData[0].forEach((obj, index) => {
  Object.defineProperty(obj, "__rowNum__", {
    value: index + 1,
    writable: true,
    enumerable: false,
    configurable: true,
  });
});

const Navbar = () => {
  const { jsonFile, setJsonFile } = useContext(JsonFileContext);

  const handleClick = () => {
    setJsonFile((prev) => sampleData);
    console.log(jsonFile);
  };

  return (
    <header className="w-full z-50 transition-all duration-300 backdrop-blur-sm shadow-lg ">
      <div className="mx-auto px-[2%] md:px-[5%] h-max flex items-center justify-between">
        <a href="/">
          <img
            className="w-[140px] md:w-[155px] pb-2"
            src="/public/logo.png"
            alt="company logo"
          />
        </a>
        <p className="text-lg md:text-xl lg:text-2xl text-center font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Your Data, Your Rules – Edit Before Converting!
        </p>
        <Button
          onClick={handleClick}
          className="px-2 md:px-5 shadow-green-200 shadow-lg text-[16px] md:text-lg font-serif bg-gradient-to-b hover:bg-gradient-to-t from-green-500 to-blue-600 bg-clip-text text-transparent"
        >
          {" "}
          Try it out
        </Button>
      </div>
    </header>
  );
};

export default Navbar;

import DataRow from './DataRow';

const PreviewData = ({columnNames ,filesToRender, handleDelete}) => {
  return (
    <section className=" overflow-x-scroll py-8">

        {/* colums of sheet  */}
        <div
          className={`bg-[#eeecec] pl-2 py-3 border-b min-w-full border-[#8a8a8a] grid grid-flow-col w-max`}
        >
          <p className="w-[90px]">
                  Row No.
                </p>
          {columnNames.length > 0 &&
            columnNames.map((value: any) => {
              return (
                <p key={value} className="w-[230px]">
                  {value}
                </p>
              );
            })}
          <p className="w-[100px]">Delete</p>
        </div>

        {/* values of columns  */}
        <div>
          {filesToRender.length > 0 &&
            filesToRender.map((value, index) => {
              if(!value) return
              return <DataRow handleDelete={handleDelete} data={value} columns={columnNames} key={index} />;
            })}
        </div>
      </section>
  )
}

export default PreviewData

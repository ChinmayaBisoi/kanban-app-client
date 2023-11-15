import BoardOptions from "@/components/BoardOptions";
import BoardColumn from "@/components/BoardColumn";
import Star from "@/components/icons/Star";
import Layout from "@/components/layouts/Layout";
import useScreenSize from "@/hooks/useScreenSize";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateList from "@/components/CreateList";

const columns = [
  { label: "To do", id: 1 },
  { label: "In progress", id: 2 },
  { label: "Completed", id: 3 },
  { label: "In progress", id: 4 },
  { label: "Completed", id: 5 },
];

const BoardPage = () => {
  const { height: customHeight } = useScreenSize(-129, 0);
  const isFav = false;

  // useEffect(() => {
  //   console.log(customHeight, customHeight + 125, window.innerHeight);
  // });

  const [boardColumns, setBoardColumns] = useState(columns);

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const updatedColumns = [...boardColumns];
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    setBoardColumns(updatedColumns);
  };

  return (
    <Layout wrapperCss="">
      <div className="" style={{ height: customHeight + "px" }}>
        <div className="flex justify-between gap-4 p-4 bg-gray-100">
          <div className="flex gap-4 items-center">
            <h2>Board Title</h2>
            <Star wrapperCss="text-white" iconCss="w-5 h-5" />
          </div>
          <div className="flex gap-4">
            <BoardOptions />
            <p>Search function</p>
            <p>Maybe filter functionality?</p>
          </div>
        </div>
        <div className="h-full flex overflow-auto gap-4 p-4">
          <DndProvider backend={HTML5Backend}>
            {boardColumns.map((column: any, index) => (
              <BoardColumn
                key={column.id}
                id={column.id}
                label={column.label}
                index={index}
                moveColumn={moveColumn}
              />
            ))}
          </DndProvider>
          <CreateList />
        </div>
      </div>
    </Layout>
  );
};

export default BoardPage;

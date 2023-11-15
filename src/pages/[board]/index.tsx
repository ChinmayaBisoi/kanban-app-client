import BoardOptions from "@/components/BoardOptions";
import BoardColumn from "@/components/BoardColumn";
import Star from "@/components/icons/Star";
import Layout from "@/components/layouts/Layout";
import useScreenSize from "@/hooks/useScreenSize";
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateList from "@/components/CreateList";
import { useLoginState } from "@/context/login-context";
import { useRouter } from "next/router";
import getBoardById from "../api/boards/get-board-by-id";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { BoardDetails, Column } from "@/types/board";

function ShimmerBoardTopNav() {
  return (
    <>
      <div className="h-10 w-40 shimmer rounded-md" />
      <div className="flex gap-4">
        <div className="h-10 w-10 shimmer rounded-md" />
        <div className="h-10 w-10 shimmer rounded-md" />
      </div>
    </>
  );
}

function ShimmerColumns() {
  return (
    <>
      <div className="border shimmer min-w-[208px] rounded-lg w-52 p-2 flex flex-col gap-2" />
      <div className="border shimmer min-w-[208px] rounded-lg w-52 p-2 flex flex-col gap-2" />
      <div className="border shimmer min-w-[208px] rounded-lg w-52 p-2 flex flex-col gap-2" />
      <div className="min-w-[208px] h-16 shimmer rounded-md" />
    </>
  );
}

const BoardPage = () => {
  const { height: customHeight } = useScreenSize(-129, 0);
  const { isLoggedIn } = useLoginState();
  const { query } = useRouter();
  const { board: boardId } = query;

  const [boardDetails, setBoardDetails] = useState<Partial<BoardDetails>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const boardColumns = (boardDetails.columns || []).sort(
    (a, b) => a.order - b.order
  );

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const updatedColumns = [...boardColumns];
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    // setBoardColumns(updatedColumns);
  };

  useEffect(() => {
    console.log(boardColumns);
  });

  function raiseError(err?: string) {
    toast({
      title: "Error fetching board details",
      description: err || "",
      variant: "destructive",
    });
    setError(true);
  }

  async function fetchBoardById() {
    if (!isLoggedIn || !boardId) return;

    setLoading(true);
    setError(false);
    await getBoardById({ boardId })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setBoardDetails(res.board);
        } else {
          raiseError();
        }
      })
      .catch((err) => {
        raiseError(err.message);
      });
    setLoading(false);
  }

  useEffect(() => {
    fetchBoardById();
  }, [isLoggedIn, boardId]);

  return (
    <Layout wrapperCss="">
      {!isLoggedIn && (
        <div className="p-4 text-lg font-medium">
          Please login to view your board !
        </div>
      )}
      {error && (
        <div className="p-4 text-lg font-medium">
          Error trying to get board details.{" "}
          <Button onClick={fetchBoardById}>Try again</Button>{" "}
        </div>
      )}
      {isLoggedIn && !error && (
        <div className="" style={{ height: customHeight + "px" }}>
          <div className="flex justify-between gap-4 p-4">
            {loading ? (
              <ShimmerBoardTopNav />
            ) : (
              <>
                <h2 className="font-bold">{boardDetails.title}</h2>
                <div className="flex gap-4">
                  <BoardOptions boardDetails={boardDetails} />
                </div>
              </>
            )}
          </div>
          <div className="h-full flex overflow-x-auto gap-4 p-4">
            {loading ? (
              <ShimmerColumns />
            ) : (
              <>
                <DndProvider backend={HTML5Backend}>
                  {boardColumns.map((column: Column, index) => (
                    <BoardColumn
                      key={column.id}
                      index={index}
                      column={column}
                      moveColumn={moveColumn}
                    />
                  ))}
                </DndProvider>
                <CreateList />
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BoardPage;

import BoardColumn from "@/components/BoardColumn";
import BoardOptions from "@/components/BoardOptions";
import CreateList from "@/components/CreateList";
import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useLoginState } from "@/context/login-context";
import useScreenSize from "@/hooks/useScreenSize";
import { BoardDetails, Card, Column } from "@/types/board";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getBoardById from "../api/boards/get-board-by-id";

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
  const customHeight = useScreenSize(-129);
  const { isLoggedIn } = useLoginState();
  const { query } = useRouter();
  const { board: boardId } = query;

  const [boardDetails, setBoardDetails] = useState<Partial<BoardDetails>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const boardColumns = (boardDetails.columns || []).sort(
    (a, b) => a.order - b.order
  );

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

  function addnewColumnToBoard(column: Column) {
    setBoardDetails((prev: any) => {
      return { ...prev, columns: [...prev.columns, column] };
    });
  }

  function updateCardsInList(card: Card) {
    setBoardDetails((prev: any) => {
      return {
        ...prev,
        columns: prev.columns.map((column: Column) => {
          if (column.id === card.columnId) {
            return {
              ...column,
              cards: [
                ...column.cards.filter((c: Card) => c.id !== card.id),
                card,
              ],
            };
          } else {
            return column;
          }
        }),
      };
    });
  }

  function removeCardFromList(card: Card) {
    setBoardDetails((prev: any) => {
      return {
        ...prev,
        columns: prev.columns.map((column: Column) => {
          if (column.id === card.columnId) {
            return {
              ...column,
              cards: [...column.cards.filter((c: Card) => c.id !== card.id)],
            };
          } else {
            return column;
          }
        }),
      };
    });
  }

  function updateCardOrder(columnId: string, x: any, y: any) {
    console.log(x, y);
    setBoardDetails((prev: any) => {
      return {
        ...prev,
        columns: prev.columns.map((column: Column) => {
          if (column.id === columnId) {
            const updatedCards: any = [...column.cards];
            const movedCard: any = updatedCards.find(
              (card: Card) => card.id === x.id
            );

            let fromIndex: any, toIndex: any;

            updatedCards.forEach((card: Card, index: number) => {
              if (card.id === x.id) {
                fromIndex = index;
              }
              if (card.id === y.id) {
                toIndex = index;
              }
              return `Element at index ${index} is ${card}`;
            });

            updatedCards.splice(fromIndex, 1);
            updatedCards.splice(toIndex, 0, movedCard);
            const final = updatedCards.map((card: any, index: number) => {
              return { ...card, order: index + 1 };
            });
            return {
              ...column,
              cards: final,
            };
          } else {
            return column;
          }
        }),
      };
    });
  }

  function removeColumnFromBoard(column: Column) {
    setBoardDetails((prev: any) => {
      return {
        ...prev,
        columns: prev.columns.filter((c: Column) => c.id !== column.id),
      };
    });
  }

  function addCardToList(card: Card) {
    setBoardDetails((prev: any) => {
      return {
        ...prev,
        columns: prev.columns.map((column: Column) => {
          if (column.id === card.columnId) {
            return { ...column, cards: [...column.cards, card] };
          } else {
            return column;
          }
        }),
      };
    });
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

  function updateBoardInfo({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    setBoardDetails((prev: any) => {
      return {
        ...prev,
        title,
        description,
      };
    });
  }

  function updateListInfo(listname: string, listId: string) {
    setBoardDetails((prev: any) => {
      return {
        ...prev,
        columns: prev.columns.map((col: Column) => {
          if (col.id === listId) {
            return { ...col, title: listname };
          } else {
            return col;
          }
        }),
      };
    });
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
                  <BoardOptions
                    updateBoardInfo={updateBoardInfo}
                    boardDetails={boardDetails}
                  />
                </div>
              </>
            )}
          </div>
          <div className="h-full flex overflow-x-auto gap-4 p-4">
            {loading ? (
              <ShimmerColumns />
            ) : (
              <>
                {boardColumns.map((column: Column, index) => (
                  <BoardColumn
                    updateListInfo={updateListInfo}
                    updateCardOrder={updateCardOrder}
                    key={column.id}
                    column={column}
                    addCardToList={addCardToList}
                    updateCardsInList={updateCardsInList}
                    removeCardFromList={removeCardFromList}
                    removeColumnFromBoard={removeColumnFromBoard}
                  />
                ))}

                <CreateList
                  boardId={boardDetails.id}
                  addNewColumnToBoard={addnewColumnToBoard}
                />
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BoardPage;

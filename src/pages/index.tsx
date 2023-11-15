import CreateBoard from "@/components/CreateBoard";
import LayoutWithSideNav from "@/components/layouts/LayoutWithSideNav";
import { useLoginState } from "@/context/login-context";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import getAllBoards from "./api/boards/get-all-boards";
import { toast } from "@/components/ui/use-toast";
import { Board } from "@/types/board";

export default function Home() {
  const { isLoggedIn, email: userEmail, userId } = useLoginState();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function addNewBoard(board: Board) {
    setLoading(true);
    setBoards([...boards, board]);
    setLoading(false);
  }

  useEffect(() => {
    console.log("Page : /");
    console.log(boards);
  });

  async function fetchAllBoards() {
    if (!isLoggedIn) return;
    setLoading(true);
    setError(false);
    await getAllBoards()
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setBoards(res.boards);
        } else {
          toast({
            title: "Unexpected error fetching boards",
            description: res.message,
            variant: "destructive",
          });
          setError(true);
        }
      })
      .catch((err) => {
        toast({
          title: "Error trying to register",
          description: err,
          variant: "destructive",
        });
        setError(true);
      });
    setLoading(false);
  }

  useEffect(() => {
    fetchAllBoards();
  }, [isLoggedIn]);

  return (
    <LayoutWithSideNav childrenCss="px-4 py-8 w-full">
      <main className="flex flex-col gap-4 md:gap-8">
        <div className="flex xs:flex-row flex-col xs:items-center xs:justify-between gap-x-4 gap-y-2 mb-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">Boards</h1>
            <h3 className="text-gray-500">Create and manage your boards.</h3>
          </div>
          <CreateBoard isLoggedIn={isLoggedIn} addNewBoard={addNewBoard} />
        </div>
        {isLoggedIn ? (
          <div className="grid md:grid-cols-2 gap-4">
            {loading ? (
              <>
                <div className="shimmer h-20"></div>
                <div className="shimmer h-20"></div>
              </>
            ) : boards.length > 0 ? (
              boards.map(({ id, title, description }) => {
                return (
                  <Link
                    href={`/${id}`}
                    key={id}
                    className="shadow rounded-md border p-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <p>{title}</p>
                    <p>{description}</p>
                  </Link>
                );
              })
            ) : (
              <p className="col-span-full">
                No boards present, create a board to view here.
              </p>
            )}
          </div>
        ) : (
          <h2 className="font-semibold text-lg">Login to view your boards</h2>
        )}
      </main>
    </LayoutWithSideNav>
  );
}

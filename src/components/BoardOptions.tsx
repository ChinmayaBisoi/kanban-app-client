import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import { useRef, useState } from "react";
import DeleteBoard from "./DeleteBoard";
import Dropdown from "./common/Dropdown";
import VerticalDots from "./icons/VerticalDots";
import BoardInfo from "./BoardInfo";
import { BoardDetails } from "@/types/board";
import EditBoard from "./EditBoard";

const BoardOptions = ({
  boardDetails,
}: {
  boardDetails: Partial<BoardDetails>;
}) => {
  const [show, setShow] = useState(false);
  const colOptionsRef = useRef<HTMLDivElement>(null);
  useOnOutsideClick(colOptionsRef, close);

  function close() {
    setShow(false);
  }

  function toggle() {
    setShow((prev) => !prev);
  }
  return (
    <div ref={colOptionsRef} className="relative">
      <VerticalDots
        wrapperCss="hover:bg-gray-200"
        onClick={toggle}
        iconCss=""
      />
      <Dropdown wrapperCss="right-0" show={show} close={close}>
        <div className="flex flex-col gap-1">
          {/* <EditBoard
            title={boardDetails.title}
            boardId={boardDetails.id}
            description={boardDetails.description}
          /> */}
          <BoardInfo
            title={boardDetails.title}
            description={boardDetails.title}
          />
          <DeleteBoard title={boardDetails.title} boardId={boardDetails.id} />
        </div>
      </Dropdown>
    </div>
  );
};

export default BoardOptions;

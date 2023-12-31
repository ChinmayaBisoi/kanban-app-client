import { useState } from "react";
import Popup from "./common/Popup";
import { Button } from "./ui/button";

const BoardInfo = ({
  title = "",
  description,
}: {
  title?: string;
  description?: string;
}) => {
  const [show, setShow] = useState(false);
  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={open}
        className="flex gap-1 items-center w-full"
      >
        {/* <span>-</span> */}
        <span>Details</span>
      </Button>
      <Popup wrapperCss="min-w-[400px] max-h-[500px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Board Details</h2>
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-sm font-semibold">Board Name</div>
              <div>{title}</div>
            </div>
            <div>
              <div className="text-sm font-semibold">Description</div>
              <div>{description}</div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default BoardInfo;

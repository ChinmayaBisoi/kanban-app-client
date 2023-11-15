import BoardColumnOptions from "@/components/BoardOptions";
import Star from "@/components/icons/Star";
import Layout from "@/components/layouts/Layout";
import useScreenSize from "@/hooks/useScreenSize";

const columns = [
  { label: "To do" },
  { label: "In progress" },
  { label: "Completed" },
];

const BoardPage = () => {
  const { height: customHeight } = useScreenSize(-125, 0);
  const isFav = false;

  // useEffect(() => {
  //   console.log(customHeight, customHeight + 125, window.innerHeight);
  // });

  return (
    <Layout wrapperCss="">
      <div className="" style={{ height: customHeight + "px" }}>
        <div className="flex justify-between gap-4 p-4 bg-gray-100">
          <div className="flex gap-4 items-center">
            <h2>Board Title</h2>
            <Star wrapperCss="text-white" iconCss="w-5 h-5" />
            <p>Create List</p>
          </div>
          <div className="flex gap-4">
            <p>Add Members</p>
            <p>Search function</p>
            <p>Maybe filter functionality?</p>
          </div>
        </div>
        <div className="h-full flex overflow-auto gap-4 p-4">
          <div className="border min-w-[208px] w-52">
            <div className="flex justify-between gap-4 p-2">
              <p>To do</p>
              <BoardColumnOptions />
            </div>
          </div>
          <div className="border min-w-[208px] w-52 ">column</div>
          <div className="border min-w-[208px] w-52">column</div>
          <div className="border min-w-[208px] w-52">column</div>
          <div className="border min-w-[208px] w-52">column</div>
          <div className="border min-w-[208px] w-52">column</div>

          <div className="border min-w-[208px] w-52">column</div>
        </div>
      </div>
    </Layout>
  );
};

export default BoardPage;

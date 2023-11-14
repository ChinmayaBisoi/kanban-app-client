import CreateBoard from "@/components/CreateBoard";
import LayoutWithSideNav from "@/components/layouts/LayoutWithSideNav";

export default function Home() {
  return (
    <LayoutWithSideNav childrenCss="px-4 py-8 w-full">
      <main className="flex flex-col gap-4 md:gap-8">
        <div className="flex xs:flex-row flex-col xs:items-center xs:justify-between gap-x-4 gap-y-2 mb-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">Boards</h1>
            <h3 className="text-gray-500">Create and manage your boards.</h3>
          </div>
          <CreateBoard />
        </div>
      </main>
    </LayoutWithSideNav>
  );
}

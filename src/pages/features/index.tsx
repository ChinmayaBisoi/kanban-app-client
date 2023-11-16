import LayoutWithSideNav from "@/components/layouts/LayoutWithSideNav";
import Link from "next/link";

function ResponsiveVideo({ src }: { src: string }) {
  return (
    <div className="max-w-[500px] rounded-md overflow-hidden shadow-lg">
      <div className="relative overflow-hidden pb-[53%] mb-[1rem]">
        <iframe
          src={src}
          title="todo part 1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

function Section({ title, src }: { title: string; src: string }) {
  return (
    <div className="">
      <p className="text-2xl font-semibold mb-4">{title}</p>
      <ResponsiveVideo src={src} />
    </div>
  );
}

const FeaturesPage = () => {
  return (
    <LayoutWithSideNav childrenCss="px-4 py-8 w-full">
      <main className="flex flex-col gap-6">
        <div className="flex xs:flex-row flex-col xs:items-center xs:justify-between gap-x-4 gap-y-1">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">Our best features</h1>
            <h3 className="text-gray-500">
              Disclaimer : Features provided in this app are not limited to the
              given below features only.
            </h3>
          </div>
        </div>
        <div className="font-semibold text-2xl mt-4">
          Video credits :{" "}
          <Link
            href="mailto:kishlayrajcool00@gmail.com"
            className="text-blue-500 underline"
          >
            Raj Kishlay
          </Link>
        </div>
        <div className="flex flex-col gap-10">
          <Section
            title="Register and Login"
            src="https://www.youtube.com/embed/HBjkt26Sj5Q"
          />

          <Section
            title="Ease-of-use and Elegant Design"
            src="https://www.youtube.com/embed/uMsTIGtSNMM"
          />
        </div>
      </main>
    </LayoutWithSideNav>
  );
};

export default FeaturesPage;

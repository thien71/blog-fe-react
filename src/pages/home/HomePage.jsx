import Section1 from "./components/section1";
import Section2 from "./components/section2";

const HomePage = () => {
  return (
    <>
      {/* <div className="relative w-full h-screen z-10 bg-slate-300"></div> */}
      <div className="container max-w-screen-xl mx-auto px-6 pt-16 pb-6">
        <Section1 />
        <Section2 />
      </div>
    </>
  );
};

export default HomePage;

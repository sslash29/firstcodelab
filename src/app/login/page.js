import LogInForm from "@/components/LogInForm";
import Navbar from "@/components/website/Navbar";

function page() {
  return (
    <div className="h-dvh flex flex-col w-full">
      <Navbar />
      <div className="w-full h-dvh items-center justify-center flex">
        <LogInForm />
      </div>
    </div>
  );
}

export default page;

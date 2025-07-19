import { Link } from "react-router-dom";
import ServiceImage from "../assets/services.jpg";

export default function HomePage() {
  return (
    <>
      <div className="w-full flex max-h-full">
        <img src={ServiceImage} alt="" className="max-w-2/3 min-h-full" />
        <div className="flex items-center w-full flex-col text-[var(--Accent)] bg-gray-400 justify-center">
          <h1 className="text-2xl my-12 font-semibold">Welcome, please select a view</h1>
          <div className="flex flex-col gap-6 items-center">
            <Link to="/overview" className="flex justify-center bg-gray-300 text-[var(--Accent)] delay-[.125s] duration-300 items-center p-12 rounded-xl shadow-xl hover:scale-105 cursor-pointer">
              <p className="text-2xl font-bold">Overview Mode</p>
            </Link>
            <Link to="/login" className="bg-gray-300 text-[var(--Accent)] p-16 rounded-xl shadow-xl justify-center delay-[.125s] duration-300 items-center flex hover:scale-105 cursor-pointer">
              <p className="text-2xl font-bold">Admin Mode</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

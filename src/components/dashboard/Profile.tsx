import { MdOutlineLogout } from "react-icons/md";

export default function Profile() {
  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
        <div className="flex mb-20 items-center space-x-3 lg:space-x-9">
            <div className="lg:w-[146px] lg:h-[146px] w-[74px] h-[74px] rounded-full bg-[#60D8F4] border border-[#2B54B8]"></div>
            <div className="">
                <p className="text-2xl lg:text-5xl">Victor Okpukpan</p>
                <p className="text-[#666666] text-base lg:text-3xl">vokpukpan@gmail.com</p>
            </div>
        </div>

        <button className="bg-[#1B1E24] w-full text-[#CC3030] text-left rounded-[10px] py-8 flex items-center space-x-2 px-11">
        <MdOutlineLogout className="h-6 w-6" />

            <p className="text-[28px]">Log Out</p>
        </button>
    </div>
  )
}

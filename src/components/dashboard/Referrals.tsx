export default function Referrals() {
  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
      <div className="flex mb-8 mx-auto items-center space-x-5">
        <div className="py-4 truncate flex-1 px-8 bg-[#1B1E24] rounded-[10px]">
          <p className="truncate text-sm lg:text-base">https://dft.io/auth/signup?upline=66749a4fcee4265e9f0b1d65</p>
        </div>
        <button className="bg-[#0057FF] py-4 px-8 lg:px-24 rounded-[10px] text-sm lg:text-base">Copy</button>
      </div>

      <div className="flex mb-5 justify-between text-base lg:text-3xl items-center">
        <p className="">Total Invites (0)</p>
        <p className="">DTF Points Earned: 0</p>
      </div>

      <div className="bg-[#1B1E24] w-full py-14 rounded-[10px]">
        <p className="text-2xl lg:text-5xl text-center">No Refferals yet</p>
      </div>
    </div>
  );
}

"use client";

export default function CartInfo() {
  return (
    <div
      className="bg-white rounded-2xl shadow-[0px_4px_32px_0px_#3326AE0A] 
                 w-[280px] h-[420px] p-6 flex flex-col"
    >
      <h2 className="text-gray-700 font-semibold mb-6">Cart</h2>

     
      <div className="relative w-24 h-24 mx-auto mb-6">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 36 36"
        >
          <path
            className="text-purple-200"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-purple-500"
            strokeWidth="3"
            strokeDasharray="38, 100"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">
          36%
        </div>
      </div>

   
      <div className="flex justify-between text-sm text-gray-500 mt-auto">
        <div>
          <p>Abandoned Cart</p>
          <p className="font-semibold text-gray-800">720</p>
        </div>
        <div className="text-right">
          <p>Abandoned Revenue</p>
          <p className="font-semibold text-gray-800">$5,900</p>
        </div>
      </div>
    </div>
  );
}

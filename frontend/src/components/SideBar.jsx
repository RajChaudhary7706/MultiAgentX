import React from "react";
import { PanelLeft, PenBoxIcon } from "lucide-react";

function SideBar() {
  return (
    <div
      className="fixed lg:static inset-y-0 left-0 z-50
      w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
          <button
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
            hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150
            bg-transparent border-none cursor-pointer"
          >
            <PanelLeft size={18} />
          </button>

          <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
            MultiAgentX
          </span>
          <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border
          border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>
            free
          </span>
          <button className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
          hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'>
            <PenBoxIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full text-slate-800 px-4 py-2 rounded-sm mt-2 mb-4 border border-gray-300 focus:outline-none focus:border-indigo-500"
  />
));
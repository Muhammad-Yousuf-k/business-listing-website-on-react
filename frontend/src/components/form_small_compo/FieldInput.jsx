
function FieldInput({ className = "", ...props }) {
    return (
        <input
            {...props}
            
            className={`w-full border-[1.5px] border-slate-200 rounded-[10px] px-3.5 py-2.5 text-sm text-gray-900 bg-white font-sans outline-none transition focus:border-[#085db7] focus:ring-[3px] focus:ring-[rgba(8,93,183,0.1)] ${className}`}
        />
    );
}

export default FieldInput
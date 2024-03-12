export function InputBox ({label, placeholder, onchange}){
     return <>
      <div className="text-sm font-medium text-left py-2">
        {label}

     </div>
     <input onChange={onchange} placeHolder ={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"></input>
     </>
}
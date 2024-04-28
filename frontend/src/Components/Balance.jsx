export const Balance = ({value})=>{
    return <div className  = "flex">
<div className="font-bold text-lg">
 Your Balance
 {value}
</div>
<div className="font-semibold ml-4 text-lg">
    {value}
</div>
    </div>
}
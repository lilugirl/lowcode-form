import { CompConfig } from "../data"

export const Input=({props}:CompConfig)=>{
    const label=props.filter(item=>item.id==='title')[0]?.value
    const placeholder:string=props.filter(item=>item.id==='placeholder')[0]?.value as string || ''
    const field=props.filter(item=>item.id==='field')[0]?.value as string || ''
    const required=props.filter(item=>item.id==='required')[0]?.value as boolean || false
    console.warn({props,field})
    return <div className='field'>
        <label>{label}</label>
        <input name={field} id={field} type='text' placeholder={placeholder} required={required} />
    </div>
}
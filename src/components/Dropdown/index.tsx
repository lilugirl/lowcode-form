import { CompConfig } from "../data";

export const Dropdown = ({  props }: CompConfig) => {
  const label = props.filter((item) => item.id === "title")[0]?.value;
  const items= props.filter((item) => item.id === "items")[0]?.value as string
  const options=items.split(',')
  const placeholder: string =
    (props.filter((item) => item.id === "placeholder")[0]?.value as string) ||
    "";
  const selected=props.filter((item) => item.id === "selected")[0]?.value as number 
  const field =
    (props.filter((item) => item.id === "field")[0]?.value as string) || "";
  const required =
    (props.filter((item) => item.id === "required")[0]?.value as boolean) ||
    false;
  
    console.warn({props,field})
  return (
    <div className="field">
      <label>{label}</label>
      <select defaultValue={options[selected+1]} name={field} required={required}>
        <option key='default'>{placeholder}</option>
        {options.map((item,index)=>{
            if(index===selected){
                return <option key={index} selected> {item}</option>
            } {
                return <option key={index}> {item}</option>
            }
           
        })}
      </select>
    </div>
  );
};

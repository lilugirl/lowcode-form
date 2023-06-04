import { Dropdown } from "../Dropdown";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { CompConfig } from "../data";

export interface CompProps{
    data:CompConfig
}
export const Comp=({data}:CompProps)=>{

    switch(data.id){
       case 'input':
        return <Input {...data} />
       case 'dropdown':
        return <Dropdown {...data} />
       case 'textarea':
        return <Textarea {...data} />
       default:
        return null
    }

}
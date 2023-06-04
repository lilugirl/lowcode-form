import { CompConfig, comps } from "../../components/data";
import { useDndData } from "../../Context";
export const Left=()=>{
    const {setSource,setSourceIndex,setSelectedIndex,setTarget}=useDndData()
  
    // 左侧拖拽组件
    // 当被拖拽元素开始被拖拽时触发
    const onDragStart = (comp: CompConfig, index: number) => (e: any) => {
        e.target.style.opcity=0.1
   
        // 将组件暂存
        setSource(comp);
        setSourceIndex(index)
    
        if(index>-1){
          setSelectedIndex(index) 
        } 
    }

    // 拖拽结束 释放暂存
    const onDragEnd = () => (e:any) => {
        e.target.style.opcity=1;
        setSource(null);
        setTarget(null);
      };

      
   
    return <div className='left'>
         {comps.map((comp, index) => {
          return (
            <div
              className="box"
              key={index}
              draggable
              onDragStart={onDragStart(comp,-1)}
              onDragEnd={onDragEnd()}
            >
              <img src={comp.img} /> 
            </div>
          );
        })}
    </div>
}
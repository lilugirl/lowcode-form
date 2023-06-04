
// 数组元素交换位置
export const swapArr=(arr:any[],index1:number,index2:number)=>{
    arr[index1]= arr.splice(index2,1,arr[index1])[0]
    return arr
 }
 
 // 数组元素向前移动 ,index 元素当前位置
 export const moveUpArr=(arr:any[],index:number)=>{
    if(index<=0) return arr
    return swapArr(arr,index,index-1)
   
 }
 
 // 数组元素向后移动 index 元素当前位置
 export const moveDownArr=(arr:any[],index:number)=>{
     if(index>=arr.length-1) return arr
     return swapArr(arr,index,index+1)
 }
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDndData } from "../Context";
import { Comp } from "../components/Index";
import "./Preview.css";
const Preview = () => {
  const navigate = useNavigate();
  const { items, setItems, pageConfig, setPageConfig } = useDndData();

  useEffect(() => {
    const pageData = window.localStorage.getItem("pageConfig");
    if (pageData) {
      try {
        setPageConfig(JSON.parse(pageData));
      } catch (e) {
        console.warn("数据解析失败");
      }
    }
    const rawData = window.localStorage.getItem("comps");
    if (rawData) {
      try {
        setItems(JSON.parse(rawData));
      } catch (e) {
        console.warn("数据解析失败");
      }
    }
  }, []);

  const title =
    (pageConfig && pageConfig.find((item) => item.id === "title")?.value) ||
    "默认标题";
  const buttonText =
    (pageConfig && pageConfig.find((item) => item.id === "button")?.value) ||
    "提交";

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
    const data:any[]=[]
    for(let i=0;i<e.target.length;i++){
        if(e.target[i].name){
            data.push({name:e.target[i].name,value:e.target[i].value})
        }
    }


    console.log('data',data)
   
  };

  return (
    <div className="preview">
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        {items.map((item, index) => {
          return <Comp data={item} key={index} />;
        })}
        <button type="submit">{buttonText}</button>
      </form>
      <br/>
      <br/>
      <button onClick={() => navigate("/")}>返回</button>
    </div>
  );
};

export default Preview;

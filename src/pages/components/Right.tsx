import { useNavigate } from "react-router-dom";
import { useDndData } from "../../Context";
import { PropData } from "../../components/data";

export const Right = () => {
  const { items, setItems, selectedIndex, pageConfig, setPageConfig } =
    useDndData();
  const navigate = useNavigate();
  const onSave = () => {
    window.localStorage.setItem("pageConfig", JSON.stringify(pageConfig));
    window.localStorage.setItem("comps", JSON.stringify(items));
  };

  const onPreview = () => {
    onSave();
    navigate("/preview");
  };
  return (
    <div className="right">
      <div>
        <h3>页面属性</h3>
        {pageConfig.map((prop: PropData, index: number) => {
          return (
            <div key={index}>
              {prop.label}
              <input
                key={Math.random()}
                defaultValue={prop.value as string}
                onBlur={() => {
                  setPageConfig([...pageConfig]);
                }}
                onChange={(e) => {
                  prop.value = e.target.value;
                }}
              />
            </div>
          );
        })}
      </div>
      <div>
        <h3>组件属性</h3>
        <div>
          {items.length &&
            items[selectedIndex].props.map((prop: PropData, index: number) => {
              return (
                <div key={index}>
                   <div>
                   {prop.label}
                  {prop.type === "text" && (
                    <input
                      key={Math.random()}
                      defaultValue={prop.value as string}
                      onBlur={() => {
                        setItems([...items]);
                      }}
                      onChange={(e) => {
                        prop.value = e.target.value;
                      }}
                    />
                  )}
                   {prop.type === "number" && (
                    <input
                      type='number'
                      key={Math.random()}
                      defaultValue={prop.value as string}
                      onBlur={() => {
                        setItems([...items]);
                      }}
                      onChange={(e) => {
                        prop.value = Number(e.target.value);
                      }}
                    />
                  )}
                  {prop.type === "checkbox" && (
                    <input
                      type="checkbox"
                      onChange={(e:any) => {
                        prop.value = e.target.checked;
                      }}
                    />
                  )}
                   </div>
                   {prop.tip? <div className='tip'>{prop.tip}</div>: null}
                </div>
              );
            })}
        </div>
      </div>
      <br />
      <button onClick={onSave}>保存</button>{" "}
      <button onClick={onPreview}>预览</button>
      <br />
    </div>
  );
};

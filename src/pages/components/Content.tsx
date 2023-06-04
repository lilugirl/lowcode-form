import { useDndData } from "../../Context";
import down from "../../assets/down.svg";
import up from "../../assets/up.svg";
import { Comp } from "../../components/Index";
import { moveDownArr, moveUpArr, swapArr } from "../../utils";
import { CompConfig } from "../../components/data";

export const Content = () => {
  const {
    pageConfig,
    items,
    setItems,
    selectedIndex,
    setSelectedIndex,
    source,
    setSource,
    sourceIndex,
    setSourceIndex,
    target,
    setTarget,
    position,
  } = useDndData();

  // 中间组件展示区域拖拽组件
  // 当被拖拽元素开始被拖拽时触发
  const onDragStart = (comp: CompConfig, index: number) => (e: any) => {
    e.target.style.opcity = 0.1;

    // 将组件暂存
    setSource(comp);
    setSourceIndex(index);

    // 组件展示区的拖拽 设置选中的组件
    if (index > -1) {
      setSelectedIndex(index);
    }
  };

  // 组件拖拽到展示区上空
  // 被拖拽元素在目标元素上移动时触发
  const onDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (isNaN(parseInt(e.target.getAttribute("data-id")))) {
      position.current = -1; // 如果盘旋在组件展示区域之外 将位置设置为-1
    } else {
      position.current = parseInt(e.target.getAttribute("data-id")); // 如果盘旋在组件展示区域中，将位置设置为组件的序号
    }

    setTarget(source); // 将source暂存区的组件移动到目前暂存区
  };

  // 将组件释放到展示区内
  const onDrop = (e: any) => {
    e.preventDefault();

    // 添加组件
    if (sourceIndex < 0) {
      // 根据拖拽的位置编号，将目标暂存区的元素插入到合适的元素数组中，且让其选中
      if (position.current >= 0) {
        const newItems = [...items];
        newItems.splice(
          position.current,
          0,
          JSON.parse(JSON.stringify(target))
        );
        setItems(newItems);
        setSelectedIndex(position.current);
      } else {
        // 如果在组件的展示区之外释放，将组件添加到最后，且让其选中
        setItems([...items, JSON.parse(JSON.stringify(target))]);
        setSelectedIndex(items.length);
      }
    } else {
      // 组件排序 ，位置移动正确 将选中的组件和目标组件交换位置， 从新设置选中的组件
      if (position.current >= 0) {
        let newItems = [...items];
        newItems = swapArr(newItems, sourceIndex, position.current);
        setItems(newItems);
        setSelectedIndex(position.current);
      }
    }
  };

  // 当被推拽元素离开目标元素时触发
  const onDragLeave = () => {
    setTarget(null);
    position.current = -1;
  };

  // 拖拽结束 释放暂存
  const onDragEnd = () => (e: any) => {
    e.target.style.opcity = 1;
    setSource(null);
    setTarget(null);
  };

  const onSelected = (id: number) => () => {
    setSelectedIndex(id);
  };

  const handleDown = (index: number) => (e: any) => {
    e.stopPropagation();
    if (index >= items.length - 1) return;
    let newItems = [...items];
    newItems = moveDownArr(newItems, index);
    setItems(newItems);
    setSelectedIndex(index + 1);
  };

  const handleUp = (index: number) => (e: any) => {
    e.stopPropagation();
    if (index <= 0) return;
    let newItems = [...items];
    newItems = moveUpArr(newItems, index);
    setItems(newItems);
    setSelectedIndex(index - 1);
  };

  const handleDelete = (index: number) => (e: any) => {
    e.stopPropagation();
    const newItems = [...items];
    newItems.splice(index, 1);
    if (newItems.length && index === 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(index - 1);
    }
    setItems(newItems);
  };

  const title =
    (pageConfig && pageConfig.find((item) => item.id === "title")?.value) ||
    "默认标题";
  const buttonText =
    (pageConfig && pageConfig.find((item) => item.id === "button")?.value) ||
    "提交";

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(items);
  };

  console.warn('items',items)

  return (
    <div
      className="content"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <h3> {title} </h3>
      <form onSubmit={onSubmit}>
        {items.length === 0 && (
          <div className="placeholder">请将字段拖入这里</div>
        )}
        {items.length > 0 && (
          <div className="form">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={onSelected(index)}
                  data-id={index}
                  className={`box ${selectedIndex === index ? "active" : ""}`}
                  draggable
                  onDragStart={onDragStart(item, index)}
                  onDragEnd={onDragEnd()}
                >
                  <div className="action">
                    <div
                      className={`btn ${index === 0 ? "disabled" : ""}`}
                      onClick={handleUp(index)}
                    >
                      <img src={up} />
                    </div>
                    <div
                      className={`btn ${
                        index === items.length - 1 ? "disabled" : ""
                      }`}
                      onClick={handleDown(index)}
                    >
                      <img src={down} />
                    </div>
                    <div className="btn" onClick={handleDelete(index)}>
                      删除
                    </div>
                  </div>
                  <Comp data={item} />
                </div>
              );
            })}
          </div>
        )}

        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

import React, { useRef, useState } from "react";
import { CompConfig, PropData, pageConfigTpl } from "./components/data";

interface DndStore {
  pageConfig: PropData[];
  setPageConfig: React.Dispatch<React.SetStateAction<PropData[]>>;
  items: CompConfig[];
  setItems: React.Dispatch<React.SetStateAction<CompConfig[]>>;
  source: CompConfig | null;
  setSource: React.Dispatch<React.SetStateAction<CompConfig | null>>;
  sourceIndex: number;
  setSourceIndex: React.Dispatch<React.SetStateAction<number>>;
  target: CompConfig | null;
  setTarget: React.Dispatch<React.SetStateAction<CompConfig | null>>;
  position: React.MutableRefObject<number>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}
const DndContext = React.createContext<DndStore>({} as DndStore);

export const DndProvider = ({ children }: any) => {
  const [pageConfig, setPageConfig] = useState<PropData[]>(pageConfigTpl);
  const [items, setItems] = useState<CompConfig[]>([]);
  const [source, setSource] = useState<CompConfig | null>(null); // 临时容器
  const [sourceIndex, setSourceIndex] = useState(-1); // 拖拽源序号 ，对于组件来说拖拽源序号为-1
  const [target, setTarget] = useState<CompConfig | null>(null); // 临时容器
  const position = useRef(-1); // 组件拖拽到展示区域时的位置序号
  const [selectedIndex, setSelectedIndex] = useState(0); // 选中的item序号

  const store: DndStore = {
    pageConfig,
    setPageConfig,
    items,
    setItems,
    source,
    setSource,
    sourceIndex,
    setSourceIndex,
    target,
    setTarget,
    position,
    selectedIndex,
    setSelectedIndex,
  };

  return <DndContext.Provider value={store}>{children}</DndContext.Provider>;
};

export const useDndData = () => {
  return React.useContext(DndContext);
};

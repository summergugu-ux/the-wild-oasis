import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  //将收到的值设为state
  const [searchParams, setSearchParams] = useSearchParams();
  //点击得到值
  const sortBy = searchParams.get("sortBy") || "";
  //处理元素已被单击的一种方式
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  //选择元素
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;

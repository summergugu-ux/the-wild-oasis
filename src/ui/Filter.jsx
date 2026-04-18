import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "active" && prop !== "variation" && prop !== "variations",
})`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Filter({ filterField, options }) {
  //URL更新
  //第一个参数：搜索参数本身，第二个参数：更新的方法；
  const [searchParams, setSearchParams] = useSearchParams();
  //获取点击的背景
  const currentFilter = searchParams.get(filterField) || options.at(0).value;
  function handleClick(value) {
    // 工作方式：在搜索参数上设置状态本身
    searchParams.set(filterField, value);
    //再次加载
    if (searchParams.get("page")) searchParams.set("page", 1);
    //把新的搜索参数传递给搜索
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
        >
          {option.lable}
        </FilterButton>
      ))}
    </StyledFilter>
  );
  //把这里的所有数据（return），会随着道具而改变
}

export default Filter;

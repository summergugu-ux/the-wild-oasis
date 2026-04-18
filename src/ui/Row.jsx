import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  /* 水平 */
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  /* 垂直 */
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
/* 用于反应中 在反应组件中。可以设置默认道具*/
Row.defaultProps = {
  type: "vertical",
};
export default Row;

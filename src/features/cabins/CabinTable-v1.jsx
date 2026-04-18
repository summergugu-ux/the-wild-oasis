import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";

import Sprinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
//创建表，使用React查询获取data
function CabinTable() {
  //查询健：唯一标识要在这里查询的数据，实际的查询 函数：从API获取data
  const {
    isLoading,
    data: cabins,
    // error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  if (isLoading) return <Sprinner />;
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {(cabins ?? []).map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}
//role让html更容易访问，让浏览器知道这是表和行
export default CabinTable;

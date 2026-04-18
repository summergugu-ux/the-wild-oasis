import Sprinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

//创建表，使用React查询获取data，过滤器
function CabinTable() {
  const { isLoading, cabins } = useCabins();
  //读取数据
  const [searchParams] = useSearchParams();

  if (isLoading) return <Sprinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  const filterValue = searchParams.get("discount") || "all";
  //过滤数据
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //排序
  const sortBy = searchParams.get("sortBy") || "startDate-acs";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
//role让html更容易访问，让浏览器知道这是表和行
export default CabinTable;

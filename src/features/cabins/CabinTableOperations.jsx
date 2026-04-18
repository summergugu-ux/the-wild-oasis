import TableOpterations from "../../ui/TableOperations";

import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOpterations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort by name (A-Z)",
          },
          {
            value: "name-des",
            label: "Sort by name (Z-A)",
          },
          {
            value: "regularPrice-abc",
            label: "Sort by price (low frist)",
          },
          {
            value: "regularPrice-des",
            label: "Sort by price (hight frist)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (low firest)",
          },
          {
            value: "maxCapacity-des",
            label: "Sort by capacity (hight first)",
          },
        ]}
      />
    </TableOpterations>
  );
}

export default CabinTableOperations;

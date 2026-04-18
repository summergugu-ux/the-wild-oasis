import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  //查询健：唯一标识要在这里查询的数据，实际的查询 函数：从API获取data
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
}

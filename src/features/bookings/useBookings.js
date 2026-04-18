import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  //自动从UPL中读取筛选值
  const [searchParams] = useSearchParams();

  //过滤
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //排序 startDate-desc默认值
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [filed, direcation] = sortByRaw.split("-");
  const sortBy = { filed, direcation };
  //分页
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //预取

  //查询健：唯一标识要在这里查询的数据，实际的查询 函数：从API获取data
  const {
    isLoading,
    data = { data: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    //传递一个选项对象来获得预定
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  console.log("Raw data from useQuery:", data);

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  console.log("bookings after extraction:", bookings); // 添加这一行
  //return之前,pre-fetch查询方法
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      //传递一个选项对象来获得预定
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      //传递一个选项对象来获得预定
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, count, error };
}

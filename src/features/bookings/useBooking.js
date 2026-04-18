import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  //查询健：唯一标识要在这里查询的数据，实际的查询 函数：从API获取data
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    //获取所有关于这个id的预定数据
    queryFn: () => getBooking(bookingId),
  });
  return { isLoading, booking, error };
}

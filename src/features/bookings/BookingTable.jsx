import BookingRow from "./BookingRow";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  // // 防御性处理：确保后续代码始终使用数组，兼容以下情况：
  // // - props 直接传入 bookings
  // // - 或者组件从 hook/react-query 得到 data（data 或 data.data）
  // const bookingList = bookings ?? data ?? data?.data ?? [];
  // const total = bookingList.length;

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={bookingList}
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default BookingTable;

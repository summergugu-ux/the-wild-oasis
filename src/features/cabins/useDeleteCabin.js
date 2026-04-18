import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  //删除useMutation,第一个元素是mutation函数，响应查询将调用的函数,onSuccess:告诉mutation之后怎么办
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    //再次是查询函数无效，需要在查询客户端上调用,哪些确切的数据应该无效,查询无效就会再次获取
    // 每一个查询都是唯一标识的
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  //mutation 重置表格
  //删除useMutation,第一个元素是mutation函数，响应查询将调用的函数,onSuccess:告诉mutation之后怎么办
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    //使用突变结果createCabin
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin successful deleted");
      // 封装在突变已经发生的地方
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //调用重置函数,
      // reset();
      //重置，来自react hook表单库
    },
    //再次是查询函数无效，需要在查询客户端上调用,哪些确切的数据应该无效,查询无效就会再次获取
    // 每一个查询都是唯一标识的
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}

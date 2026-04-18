import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  //更新setting
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    //突变发生的地方
    onSuccess: () => {
      toast.success("Setting successful edited");
      // 封装在突变已经发生的地方
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });
      //调用重置函数,
      // reset();
    },
    //再次是查询函数无效，需要在查询客户端上调用,哪些确切的数据应该无效,查询无效就会再次获取
    // 每一个查询都是唯一标识的
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
}

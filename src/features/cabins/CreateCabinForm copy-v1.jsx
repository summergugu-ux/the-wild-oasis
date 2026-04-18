import {
  // QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { creatCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();
  const { errors } = formState;

  //mutation 重置表格
  //删除useMutation,第一个元素是mutation函数，响应查询将调用的函数,onSuccess:告诉mutation之后怎么办
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: creatCabin,
    onSuccess: () => {
      toast.success("Cabin successful deleted");
      // 封装在突变已经发生的地方
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //调用重置函数,
      reset();
    },
    //再次是查询函数无效，需要在查询客户端上调用,哪些确切的数据应该无效,查询无效就会再次获取
    // 每一个查询都是唯一标识的
    onError: (err) => toast.error(err.message),
  });
  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {
    // console.log(errors);
  }

  //第二个参数传递给对象进行验证，简单定义所需的属性
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required," })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", { required: "This field is required," })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", { required: "This field is required," })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

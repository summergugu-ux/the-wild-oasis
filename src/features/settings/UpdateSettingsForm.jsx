import { useSetting } from "./useSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateUser } from "../authentication/useUpdateUser";

function UpdateSettingsForm() {
  //获取数据
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLenth,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSetting();

  //更新
  const { isUpating, updateSetting } = useUpdateUser();

  //加载
  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    //获得值
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpating}
          defaultValue={maxBookingLenth}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

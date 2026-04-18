import supabase from "./supabase";

//获得设置
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();
  //signgle:取单一的东西而不是整个数组
  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

//更新设置
// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}

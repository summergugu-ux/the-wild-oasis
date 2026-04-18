import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://biiwhcgtzjqtmrwtnxip.supabase.co";
const supabaseKey = "sb_publishable_QLGGsi32z8lJ71Ep668XqA_j3rCmnpu";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

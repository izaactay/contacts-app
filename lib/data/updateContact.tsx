"use server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export default async function insertContact(formData: FormData) {
  //create supabase connection object
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  //get respective ids
  let id = formData.get("id");
  let img_id = formData.get("img_id");

  //insert image into supabase storage
  let image: any = formData.get("image");
  const storage_res = await supabase.storage
    .from("contact_image")
    .update("images/" + img_id + ".png", image, {
      upsert: true,
    });
  if (storage_res.error) {
    console.log(storage_res.error);
    throw new Error("Failed to update storage data");
  }

  //Insert new contact into database
  const db_res = await supabase
    .from("Contacts")
    .update({
      name: formData.get("name"),
      image: storage_res.data.path,
      last_contact: formData.get("last_contact"),
    })
    .eq("id", id);

  if (db_res.error) {
    throw new Error("Failed to insert data");
  }
  revalidatePath("/"); //Refreshes main page to update with new contact
}

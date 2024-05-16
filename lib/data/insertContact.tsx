"use server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export default async function insertContact(formData: FormData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  var id = randomUUID();
  let image: any = formData.get("image");
  const storage_res = await supabase.storage
    .from("contact_image")
    .upload("images/" + id + ".png", image);
  if (storage_res.error) {
    console.log(storage_res.error);
    throw new Error("Failed to upload data");
  }

  revalidatePath("/");
  const db_res = await supabase
    .from("Contacts")
    .insert({
      name: formData.get("name"),
      image: storage_res.data.path,
      last_contact: formData.get("last_contact"),
      img_id: id,
    });

  if (db_res.error) {
    throw new Error("Failed to insert data");
  }
}

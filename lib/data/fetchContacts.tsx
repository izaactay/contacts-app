"use Server";
import { createClient } from "@supabase/supabase-js";

async function fetchImage(contact: any) {
  contact.img_link = process.env.SUPABASE_STORAGE_URL! + contact.image;
}

export default async function fetchContacts() {
  //create supabase connection object
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  //fetch all contacts
  const { data: Contacts, error } = await supabase.from("Contacts").select("*");
  //fetch image for each contact
  if (Contacts) {
    Contacts.forEach(fetchImage);
  }

  if (error) {
    throw new Error("Failed to fetch data");
  }
  return Contacts;
}

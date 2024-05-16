"use Server";
import { createClient } from "@supabase/supabase-js";

async function fetchImage(contact: any) {
  contact.img_link = process.env.SUPABASE_STORAGE_URL! + contact.image;
}

export default async function fetchContacts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data: Contacts, error } = await supabase.from("Contacts").select("*");
  if (Contacts) {
      Contacts.forEach(fetchImage);
  }

  if (error) {
    throw new Error("Failed to fetch data");
  }
  return Contacts;
}

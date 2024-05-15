import { createClient } from '@supabase/supabase-js';


export default async function fetchContacts() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    let { data: Contacts, error } = await supabase.from('Contacts').select('*')
    
    if (error) {
        throw new Error('Failed to fetch data')
    }
    return Contacts
  }
import ContactCard from "@/components/ContactCard";
import fetchContacts from '@/lib/data/fetchContacts';

export default async function ContactList() {
    let contacts:any = await fetchContacts();

    return (
        <section>
        {contacts.map((contact:any) => (
            <ContactCard key={contact.id} contact={contact}/>
          ))}
        </section>
    )

}
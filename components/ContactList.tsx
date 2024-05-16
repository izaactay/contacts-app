import ContactCard from "@/components/ContactCard";
import fetchContacts from '@/lib/data/fetchContacts';


export default async function ContactList() {
    let contacts:any = await fetchContacts();
    if (contacts.length > 0) {
        return (
            <section>
            {contacts.map((contact:any) => (
                <ContactCard key={contact.id} contact={contact}/>
              ))}
            </section>
        )
    } else {
        return (
            <section >
                <h1 className="text-2xl text-center">You have no contacts right now!</h1>
            </section>
        )
    }


    

}
import AddContact from "@/components/AddContact";
import ContactList from "@/components/ContactList";





export default function Home() {
  
  return (
    <main className="min-h-screen w-full mx-auto my-16 space-y-16 max-w-7xl p-8">
      <section className="flex w-full">
        <section className="text-4xl lg:w-3/4">
          <h1>Contacts</h1>
        </section>
        <section className="flex grow justify-end">
          <AddContact />
        </section>
      </section>
      <section className="w-full">
        
        <ContactList />
      </section>
    </main>
  );
}

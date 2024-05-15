import AddContact from "@/components/AddContact";
import ContactCard from "@/components/ContactCard";

export default function Home() {
  return (
    <main className="min-h-screen p-24 lg:px-72">
      <section className="flex w-full">
        <section className="text-4xl lg:w-3/4">
          <h1>Contacts</h1>
        </section>
        <section className="flex grow justify-end">
          <AddContact />
        </section>
      </section>
      <section className="w-full">
        <ContactCard />
      </section>
    </main>
  );
}

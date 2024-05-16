"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { useState } from "react";
import {
    Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import updateContact from "@/lib/data/updateContact";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

//Constants for Max file size and images

const MAX_FILE_SIZE = 6000000;

//Zod schema for form validation

const EditContactSchema = z.object({
  name: z.string().min(1, "Please enter a valid name").max(50),
  image: z.instanceof(File).refine((file) => file.size < MAX_FILE_SIZE, {
    message: "Your image must be less than 6MB.",
  }),
  last_contact: z.date(),
});

export default function ContactCard(data: any) {
  const [open, setOpen] = useState(false);
  let contact = data.contact;
  const form = useForm<z.infer<typeof EditContactSchema>>({
    resolver: zodResolver(EditContactSchema),
    defaultValues: {
      name: contact.name,
      last_contact: new Date(contact.last_contact),
    },
  });

  //Submit handler
  function onSubmit(values: z.infer<typeof EditContactSchema>) {
    let formData = new FormData();
    formData.append("id", contact.id);
    formData.append("name", values.name);
    formData.append("image", values.image);
    formData.append("last_contact", values.last_contact.toISOString());
    formData.append("img_id", contact.img_id);
    updateContact(formData);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="my-2 flex h-12 w-3/4">
          <div className="w-1/12 justify-center">
            <Avatar>
              <AvatarImage src={contact.img_link} />
            </Avatar>
          </div>
          <h2 className="w-8/12 text-left">{contact.name}</h2>
          <h3 className="w-1/4">{format(contact.last_contact, "PPP")}</h3>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Update details about this contact here. Click save when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-right">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="col-span-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel htmlFor="image" className="text-right">
                      Photo
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    <FormDescription>Photo of your contact</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="last_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="last_contact" className="text-right">
                      Last Contact Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormDescription>
                      Date you last contacted this contact
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
    </Dialog>
  );
}

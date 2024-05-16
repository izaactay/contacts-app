This contacts app is built on NextJS with a supabase database and storage. The ui elements are from Shadcn. You can find the website hosted on https://contacts-app-x8g7.vercel.app/

## Getting Started
Clone the repository to your local development server. 

Install required dependencies with:

```bash
npm install
```
Then, run the development server:

```bash
npm run dev

```

Lastly, create .env.local file with the database keys. 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the page.

## App Structure

App is a SPA with the page in /app. Add Contact modal and Contact Card modals are client side components in /components. Data fetching server actions (Fetch, Insert and Update Contacts) can be found in /lib/data/. 

To build the data submission forms, react-hook-form was used, with Zod as client side data validation. 

## WIP

While most functionality is present, there are still some unfinished tasks:

1. Change text of warning message in form when no file is submitted
2. Updating Contact requires file to be uploaded. 
3. Fetching of image from server should be reworked. 
4. Error messages in form dont disappear even if modal closes when using the small 'x' button on top right


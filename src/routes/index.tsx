import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, Form } from "@builder.io/qwik-city";

export const useFilters = routeAction$(async (data, req) => {
  const newQuery = new URLSearchParams();
  const redirect = data.redirect as "1" | "2";

  delete data.redirect;

  Object.keys(data).forEach(key => {
    newQuery.set(key, JSON.stringify(data[key]));
  });

  const redirectTo = {
    "1": req.url.pathname,
    "2": "/test",
  }

  console.log(`Redirecting to ${redirectTo[redirect]}?${newQuery.toString()}`);

  throw req.redirect(302, `${redirectTo[redirect]}?${newQuery.toString()}`);
});

export default component$(() => {
  const action = useFilters();
  const selectOptions = Array.from({ length: 8 }, (_, index) => (index + 1).toString());

  return (
    <Form action={action} class="flex flex-col gap-y-4">
      <h3 class="text-sm">
        Select bedrooms
      </h3>

      <select name="redirect" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" >
        <option value="1">Redirect to same page</option>
        <option value="2">Redirect to test page</option>
      </select>

      <select name="bedrooms" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" >
        <option value="">--</option>
        {selectOptions.map((nr) => (
          <option key={nr} value={nr.toString()}>
            {`${nr} + `}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </Form>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

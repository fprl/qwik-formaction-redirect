import { component$ } from "@builder.io/qwik";
import { type DocumentHead, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();

  return (
    <h1>
      You were successfully redirected to {location.url.pathname + location.url.search}
    </h1>
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

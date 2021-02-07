<template>
  <div class="bg-gray-200 sm:px-6 px-4 lg:px-8 min-h-screen">
    <div
      class="max-w-xl py-12 lg:py-16 lg:flex lg:items-center lg:justify-between"
    >
      <h2
        class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
      >
        <span class="block">Ready for some movies? 🍿</span>
        <span class="block mt-3 sm:mt-0 text-indigo-600"
          >Use the search form below to find the cheapest film provider.</span
        >
      </h2>
    </div>
    <form-component />
  </div>
</template>
<script>
import FormComponent from "./FormComponent";
export default {
  name: "AppComponent",
  components: { FormComponent },
  data: function () {
    return {
      count: 0,
    };
  },
};
</script>

<template>
  <fragment>
    <div>
      <div class="flex flex-wrap overflow-hidden md:-mx-3">
        <div class="mt-5 w-full overflow-hidden md:my-3 md:px-3 md:w-4/12">
          <div class="shadow overflow-hidden rounded-md">
            <div class="px-4 py-5 bg-white sm:pt-5 sm:pb-3">
              <div class="block">
                <div class="col-span-6">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-xl font-extrabold text-gray-700 mb-1"
                  >
                    Provider<span class="ml-2">🎬</span></label
                  >
                  <div class="flex">
                    <label class="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="provider_name"
                        value="false"
                        v-model="provider"
                        class="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none"
                      />
                      <span class="text-gray-900 font-medium">All</span>
                    </label>
                    <label class="flex items-center space-x-3 ml-3">
                      <input
                        type="radio"
                        name="provider_name"
                        value="cinemaWorld"
                        v-model="provider"
                        class="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none"
                      />
                      <span class="text-gray-900 font-medium"
                        >Cinema World</span
                      >
                    </label>
                    <label class="flex items-center space-x-3 ml-3">
                      <input
                        type="radio"
                        name="provider_name"
                        value="filmWorld"
                        v-model="provider"
                        class="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none"
                      />
                      <span class="text-gray-900 font-medium">Film World</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-4">
              <button
                :disabled="isSearching"
                @click.prevent="search"
                type="submit"
                class="inline-flex w-full justify-center py-3 px-4 border border-transparent shadow-sm text-md font-extrabold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:cursor-wait focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  v-if="isSearching"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path></svg
                >{{ isSearching ? "Please wait" : "Search" }}
              </button>
            </div>
          </div>
        </div>
        <div class="w-full overflow-hidden md:my-3 md:px-3">
          <div class="mt-5 sm:mt-0">
            <film-results-component :films="films" />
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>
<script>
import { api } from "../../api";
import { Fragment } from "vue-fragment";
import FilmResultsComponent from "../FilmResultsComponent";
export default {
  name: "FormComponent",
  components: { Fragment, FilmResultsComponent },
  data() {
    return {
      provider: "false",
      isSearching: false,
      isSubmitting: false,
      films: [],
      modal: false,
    };
  },
  methods: {
    async search() {
      this.isSearching = true;
      const response = await api.get(`${this.provider}/movies`);
      const { status, data } = response;
      setTimeout(() => {
        this.isSearching = false;
        if (status === 200 && data.length) {
          this.films = data;
        } else {
          this.films = [];
        }
      }, 1600);
    },
  },
};
</script>

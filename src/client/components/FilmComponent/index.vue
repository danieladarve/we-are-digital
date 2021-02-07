<template>
  <fragment>
    <div
      v-if="poster.length"
      @click.prevent="!full ? $emit('modal', { id, provider }) : false"
      class="flex h-full"
      :class="
        !full
          ? `transform transition duration-500 hover:scale-110 cursor-pointer`
          : ``
      "
    >
      <div
        class="bg-cover bg-center rounded-t-none rounded-l overflow-hidden"
        :class="full ? 'w-auto' : 'w-6/12'"
        v-bind:style="{ backgroundImage: !full ? 'url(' + poster + ')' : '' }"
        :title="title"
      >
        <img
          :src="poster"
          class="w-full"
          :class="full ? 'lg:max-w-modal' : 'invisible'"
        />
      </div>
      <div
        class="border-l-0 film-item-bg rounded-b rounded-b-none rounded-r px-3 flex flex-col justify-between leading-normal"
        :class="full ? 'w-full pb-4' : 'w-6/12 py-4'"
      >
        <div class="mb-8">
          <h2
            class="leading-tight mb-2"
            :class="full ? 'text-3xl font-extrabold ' : 'text-lg font-bold '"
          >
            {{ `${title} (${year})` }}
          </h2>
          <p class="text-gray-700 text-base">{{ `${mins} Mins` }}</p>
        </div>
        <div class="flex items-center">
          <div class="text-sm">
            <p class="text-gray-900 leading-none">{{ provider }}</p>
            <p class="text-gray-600 font-extrabold">
              $<span>{{ price }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="full" class="mt-5">
      <h4 class="font-bold text-xl mb-4">Film Details</h4>
      <p v-if="plot.length" class="text-gray-700 text-base mb-3">
        <strong>Plot: </strong>{{ plot }}
      </p>
      <p v-if="director.length" class="text-gray-700 text-base mb-3">
        <strong>Director: </strong>{{ director }}
      </p>
      <p v-if="actors.length" class="text-gray-700 text-base mb-3">
        <strong>Actors: </strong>{{ actors }}
      </p>
      <p v-if="genres.length" class="text-gray-700 text-base">
        <strong>Genres: </strong>{{ genres.toString() }}
      </p>
      <h3
        class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mt-5"
      >
        <span class="block">Is the price for this film wrong?</span>
        <span class="block mt-3 mb-10 sm:mt-0 text-indigo-600"
          ><span
            @click="showForm = !showForm"
            class="cursor-pointer inline-flex justify-center py-1 px-4 border border-transparent shadow-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:cursor-wait focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Submit</span
          >
          a correction!</span
        >
      </h3>
      <div v-if="showForm" class="overflow-hidden">
        <div
          v-if="isComplete"
          class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-5 rounded-md mb-5"
          role="alert"
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
            />
          </svg>
          <p>{{ message }}</p>
        </div>
        <div class="pb-5 bg-white">
          <div class="block">
            <label
              for="submit_price"
              class="block text-sm font-medium text-gray-700"
              >Price</label
            >
            <input
              type="text"
              v-model="submitPrice"
              id="submit_price"
              @blur="formIsValid"
              @keyup="formIsValid"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <p v-if="formHasError" class="text-sm underline mt-1">
              Please enter a price
            </p>
          </div>
        </div>
        <div class="py-3 bg-gray-50 text-right">
          <button
            :disabled="isSubmitting || formHasError"
            @click.prevent="submit"
            type="submit"
            class="inline-flex w-full justify-center py-3 px-4 border border-transparent shadow-sm text-md font-extrabold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :class="
              isSubmitting
                ? 'disabled:cursor-wait'
                : formHasError
                ? 'disabled:cursor-not-allowed'
                : ''
            "
          >
            <svg
              v-if="isSubmitting"
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
            >{{ isSubmitting ? "Please wait" : "Submit" }}
          </button>
        </div>
      </div>
    </div>
  </fragment>
</template>
<script>
import mixin from "../../mixins";
import { api } from "../../api";
import { Fragment } from "vue-fragment";
export default {
  name: "FilmComponent",
  mixins: [mixin],
  components: { Fragment },
  props: {
    id: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    mins: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
    plot: {
      type: String,
      default: "",
    },
    director: {
      type: String,
      default: "",
    },
    actors: {
      type: String,
      default: "",
    },
    genres: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isComplete: false,
      message: "The form was submitted, thank you 🥳",
      isSubmitting: false,
      submitPrice: "",
      showForm: false,
      formHasError: false,
      timeout: null,
    };
  },
  methods: {
    formDebounce() {
      // clear timeout variable
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.formIsValid();
      }, 650);
    },
    formIsValid() {
      this.formHasError = this.submitPrice.length <= 0;
    },
    async submit() {
      if (!this.submitPrice.length) {
        this.formHasError = true;
        return;
      }
      this.isSubmitting = true;
      const provider = this.toCamelCase(this.provider);
      const response = await api.post(`${provider}/movie`, {
        price: this.submitPrice,
        id: this.id,
      });
      const { data } = response;
      setTimeout(() => {
        this.isSubmitting = false;
        this.formHasError = false;
        this.isComplete = true;
        if (!data) {
          this.message =
            "There was an error trying to submit the form, please try again later!";
        }
        setTimeout(() => {
          // Reset Form
          this.isComplete = false;
          this.submitPrice = "";
        }, 4500);
      }, 1600);
    },
  },
};
</script>
<style>
.film-item .film-item-bg {
  background-color: #ffffff;
}
.film-item:nth-of-type(3n) .film-item-bg {
  background-color: #b8b8b8;
}
</style>

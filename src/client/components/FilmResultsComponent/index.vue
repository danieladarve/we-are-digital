<template>
  <fragment v-if="paginated.length">
    <div class="flex flex-wrap">
      <div class="flex flex-wrap overflow-hidden md:-mx-2 lg:-mx-3">
        <div
          class="w-full my-2 md:px-2 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/4 film-item"
          v-for="(film, fi) in paginated[index - 1]"
          :key="fi + '_f'"
          :index="fi"
        >
          <film-component
            :id="film.id"
            :provider="film.provider"
            :price="film.price"
            :mins="film.runtime"
            :year="film.year"
            :title="film.title"
            :poster="film.posterUrl"
            @modal="openModal"
          />
        </div>
      </div>
      <div class="w-full mb-10 mt-5">
        <t-pagination
          :total-items="films.length"
          :per-page="15"
          :limit="5"
          v-model="index"
          :classes="{
            wrapper:
              'table border-collapse text-center bg-white rounded-md shadow',
            element:
              'w-8 h-8 border border-gray-200 font-bold table-cell hover:border-indigo-100',
            activeElement:
              'w-8 h-8 border border-indigo-600 table-cell hover:border-indigo-800',
            disabledElement: 'w-8 h-8 border border-gray-200 table-cell',
            ellipsisElement:
              'w-8 h-8 border border-gray-200 hidden md:table-cell',
            activeButton:
              'bg-indigo-600 w-full h-full text-white font-extrabold hover:bg-indigo-800 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
            disabledButton:
              'opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out',
            button:
              'hover:bg-indigo-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:outline-none focus:ring-opacity-50',
            ellipsis: '',
          }"
        />
      </div>
    </div>
    <modal-component v-show="modal" @close="modal = !modal">
      <film-component
        :id="modalData.id"
        :provider="modalData.provider"
        :price="modalData.price"
        :mins="modalData.mins"
        :year="modalData.year"
        :title="modalData.title"
        :poster="modalData.poster"
        :plot="modalData.plot"
        :director="modalData.director"
        :actors="modalData.actors"
        :genres="modalData.genres"
        :full="true"
      />
    </modal-component>
  </fragment>
</template>
<script>
import mixin from "../../mixins";
import TPagination from "vue-tailwind/dist/t-pagination";
import { Fragment } from "vue-fragment";
import FilmComponent from "../FilmComponent";
import ModalComponent from "../ModalComponent";
import chunk from "lodash/chunk";
import { api } from "../../api";
export default {
  name: "FilmResultsComponent",
  mixins: [mixin],
  components: { Fragment, TPagination, FilmComponent, ModalComponent },
  props: {
    films: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      index: 1,
      modal: false,
      modalData: {
        id: "",
        provider: "",
        price: "",
        mins: "",
        year: "",
        title: "",
        poster: "",
        plot: "",
        director: "",
        actors: "",
        genres: [],
      },
    };
  },
  computed: {
    paginated() {
      return chunk(this.films, 15) || [];
    },
  },
  methods: {
    onChangePage(pageOfItems) {
      this.index = pageOfItems;
    },
    openModal(event) {
      const provider = this.toCamelCase(event.provider);
      const { id } = event;
      const result = this.getFilm(id, provider);
      result.then((res) => {
        this.modalData.id = res[0].id || "";
        this.modalData.provider = res[0].provider || "";
        this.modalData.price = res[0].price || "";
        this.modalData.mins = res[0].runtime || "";
        this.modalData.year = res[0].year || "";
        this.modalData.title = res[0].title || "";
        this.modalData.poster = res[0].posterUrl || "";
        this.modalData.plot = res[0].plot || "";
        this.modalData.actors = res[0].actors || "";
        this.modalData.director = res[0].director || "";
        this.modalData.genres = res[0].genres || [];
        this.modal = true;
      });
    },
    async getFilm(id, provider) {
      const response = await api.get(`${provider}/movie/${id}`);
      const { status, data } = response;
      if (status === 200 && data.length) {
        return data;
      }
      return false;
    },
  },
};
</script>

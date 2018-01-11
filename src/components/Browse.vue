<template>
    <div class="browse-page">
        <h1 class="title">Browse</h1>

        <carousel-3d class="carousel" :width="200" :height="300" :perspective="0" :display="5">
            <slide class="slide" v-for="(card, i) in cards" :key="i" :index="i">
                <div class="inner-slide-div">
                    <div class="card-label">
                        {{ card }}
                    </div>
                    <img @click="showInfoModal(card)" :src="getPath(card)" alt="">
                </div>
            </slide>
        </carousel-3d>

        <q-transition enter="fadeInFast" leave="fadeOutFast">
            <app-info v-if="showInfo == true" :show="showInfo" @close="showInfo = false">
                <h3 slot="header">{{ cardFocus }}</h3>
                <p class="card-info" slot="body">{{ cardProperty }}<br><br><br>{{ cardDescription }}</p>
            </app-info>
        </q-transition>

        <div class="back-btn-cont" >
            <q-btn style="float: right; margin: 10px" icon="arrow back" color="blue" class="back-btn" @click="$router.push('/')">Back</q-btn>
        </div>
    </div>
</template>

<script>
import { QBtn, QTransition } from "quasar";
import { Carousel3d, Slide } from "vue-carousel-3d";

import cardInfoFile from "../statics/cardInfo.json";

export default {
  data() {
    return {
      cards: [
        "Ancestors",
        "Bear",
        "Bleeding Heart",
        "Butterfly",
        "Cedar",
        "Cougar",
        "Deer",
        "Douglas Fir",
        "Dragonfly",
        "Eagle",
        "Echinacea",
        "Elk",
        "Fairy Slipper Orchid",
        "Forget-Me-Not",
        "Fox",
        "Foxglove",
        "Frog",
        "Grasshopper",
        "Hawk",
        "Hermit Thrush",
        "Honey Bee",
        "Hummingbird",
        "Ladybug",
        "Lotus",
        "Lynx",
        "Maple",
        "Mouse",
        "Mushroom",
        "Nighthawk",
        "Oak",
        "Orca",
        "Owl",
        "Rabbit",
        "Raven",
        "Robin",
        "Salamander",
        "Salmon",
        "Seal",
        "Snail",
        "Spider",
        "Starfish",
        "Sylph",
        "Water Sprite",
        "White Peony",
        "Winter Rose",
        "Wolf",
        "Wood Nymph",
        "Woodpecker"
      ],
      cardFocus: "",
      showInfo: false,
      cardInfo: cardInfoFile
    };
  },
  components: {
    Carousel3d,
    Slide,
    appInfo: () => import("./InfoModal.vue"),
    QBtn,
    QTransition
  },
  computed: {
    cardProperty: function() {
      return Object.keys(this.getJsonItem())[0];
    },
    cardDescription: function() {
      return Object.values(this.getJsonItem())[0];
    }
  },
  methods: {
    getPath(card) {
      //this method will return the card path of the given card name, the require statement is so that webpack knows that it will need this file and include it
      return require(`../assets/cards/${card}.jpg`);
    },
    showInfoModal(card) {
      this.cardFocus = card;
      this.showInfo = true;
    },
    getJsonItem(lookup = this.cardFocus, obj = this.cardInfo) {
      for (let item in obj) {
        if (item == lookup) {
          return obj[item];
        } else if (obj[item] instanceof Object) {
          this.getJsonItem(lookup, obj[item]);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: "Vesper Libre", serif;
  text-align: center;
  color: white;
  margin: 10% 0 0 0;
}
.browse-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* background-color: #535353; */
  background-image: url("../assets/background.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

.title {
  text-align: center;
  flex: 0;
}

.carousel {
  flex: 2;
}

.slide {
  border: none;
}

.inner-slide-div {
  height: 100%;
  width: 100%;
}

.card-label {
  position: fixed;
  height: 30px;
  width: 100%;
  top: 0;
  z-index: 9;
  background-color: rgba(20, 20, 20, 0.7);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}

.info-title {
  text-align: center;
}
.card-info {
  font-weight: 500;
  font-size: 20px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

//change animation speed
.fadeInFast {
  -webkit-animation: fadeIn 0.3s;
  /* Safari 4+ */
  -moz-animation: fadeIn 0.3s;
  /* Fx 5+ */
  -o-animation: fadeIn 0.3s;
  /* Opera 12+ */
  animation: fadeIn 0.3s;
  /* IE 10+, Fx 29+ */
}

.fadeOutFast {
  -webkit-animation: fadeOut 0.3s;
  /* Safari 4+ */
  -moz-animation: fadeOut 0.3s;
  /* Fx 5+ */
  -o-animation: fadeOut 0.3s;
  /* Opera 12+ */
  animation: fadeOut 0.3s;
  /* IE 10+, Fx 29+ */
}
</style>

<template>
    <div class="choose">
        <div class="header">
            <div class="cards">
                <div class="picked-card-spot" v-for="card in numberOfCards" :key="card">
                    <div v-if="card -1  in pickedCards" class="picked-card">
                        <img :src="getPath('Oraclecover')" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="carousel">
            <carousel-3d class="carousel" :width="200" :height="300" :perspective="0" :display="5">
                <slide class="slide" v-for="(card, i) in cards" :key="i" :index="i">

                    <div class="inner-slide-div">
                        <div v-if="ifInArray(card)" class="card-picked">
                            <!-- {{ card }} -->
                        </div>
                        <img @click="pickCard(card)" :src="getPath('Oraclecover')" alt="">
                    </div>

                </slide>
            </carousel-3d>
        </div>

        <div class="footer">
            <h3>Choose your cards</h3>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../../main.js";
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  props: ["numberOfCards"],
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
        "dragonfly",
        "eagle",
        "echinacea",
        "elk",
        "fairyslipperorchid",
        "forgetmenot",
        "fox",
        "foxglove",
        "frog",
        "grasshopper",
        "hawk",
        "hermitthrush",
        "honeybee",
        "hummingbird",
        "ladybug",
        "lotus",
        "lynx",
        "maple",
        "mouse",
        "mushroom",
        "nighthawk",
        "oak",
        "orca",
        "owl",
        "rabbit",
        "raven",
        "robin",
        "salamander",
        "salmon",
        "seal",
        "snail",
        "spider",
        "starfish",
        "sylph",
        "watersprite",
        "whitepeony",
        "winterrose",
        "wolf",
        "woodnymph",
        "woodpecker"
      ],
      cardChoices: 0,
      pickedCards: []
    };
  },
  computed: {},
  components: {
    Carousel3d,
    Slide
  },
  methods: {
    getPath(card) {
      //this method will return the card path of the given card name, the require statement is so that webpack knows that it will need this file and include it
      return require(`../../assets/cards/${card}.jpg`);
    },
    pickCard(index) {
      //this method will grey out the picked card and display it at the top
      this.pickedCards.push(index);
    },
    ifInArray: function(value) {
      return this.pickedCards.indexOf(value) > -1 ? true : false;
    }
  },
  watch: {
    pickedCards() {
      if (this.pickedCards.length >= this.numberOfCards) {
        const self = this;
        setTimeout(function() {
          //timeout is so that the ui has time to add visual of the last picked card before changing screens
          self.$emit("chosen");
        }, 10);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-family: 'Vesper Libre', serif;
  text-align: center;
  color: white;
}
.header {
  width: 100%;
}

.cards {
  display: flex;
  justify-content: center;
  align-items: center;
}

.picked-card-spot {
  border: 1px solid black;
  border-radius: 2px;
  height: 50px;
  width: 35px;
  margin: 0 10px 0 10px;
  background-color: #333;
}

.picked-card img {
  height: 50px;
  width: 35px;
  border: 1px solid black;
}

.slide {
  border: none;
}

.card-picked {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 9;
  background-color: rgba(20, 20, 20, 0.7);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: none; */
}
</style>

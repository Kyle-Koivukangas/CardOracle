<template>
    <div class="results-container">
        <div class="title-box">
            <q-transition mode="out-in" enter="fadeIn" leave="fadeOut">
                <div class="title-box" v-if="!showMenu" key="title">
                    <h3 style="margin: auto;">Your Results</h3>
                </div>
                <div class="menu" v-if="showMenu" key="menu">
                    <q-btn @click="$router.push('/')" icon="first page" class="btn" color="blue">Menu</q-btn>
                    <q-btn icon="share" class="btn" color="blue">Share</q-btn>
                    <q-btn icon="save" class="btn" color="blue">Save</q-btn>
                </div>
            </q-transition>
        </div>

        <div class="card-info">
            <q-transition enter="fadeIn" leave="fadeOut">
                <img id="card-focus" :src="focusPath" alt="" @click="((cardFocus != 'Oraclecoverresults') ? showInfo = true : showInfo = false)">
            </q-transition>

            <q-transition enter="fadeInFast" leave="fadeOutFast">
                <app-info v-if="showInfo == true" :show="showInfo" @close="showInfo = false">
                    <h3 slot="header">{{ cardFocus }}</h3>
                    <p class="card-info" slot="body">{{ cardProperty }}<br><br><br>{{ cardDescription }}</p>
                </app-info>
            </q-transition>
        </div>

        <div class="cards">
            <div v-for="(card, i) in numberOfCards" :key="i">
                <q-transition mode="out-in" enter="flipInY" leave="flipOutY">
                    <div class="card" v-if="revealCard[i] === false" key="cardBack">
                        <img class="card-img" :src="getPath('Oraclecover')" alt="" @click="flipCard(i)">
                    </div>
                    <div class="card" v-if="revealCard[i] === true" key="cardFront">
                        <img class="card-img" :src="getPath(generatedCards[i])" alt="" @click="cardFocus = generatedCards[i]">
                    </div>
                </q-transition>
            </div>
        </div>
        <q-btn icon="adb" style="float: right; position: absolute; bottom: 0; right: 0;" color="blue" @click="showMenu = !showMenu">debug</q-btn>

    </div>
</template>

<script>
import "quasar-extras/animate/flipInY.css";
import "quasar-extras/animate/flipOutY.css";
import "quasar-extras/animate/fadeIn.css";
import "quasar-extras/animate/fadeOut.css";

import { QBtn, QTransition } from "quasar";
import cardInfoFile from "../../statics/cardInfo.json";

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
      cardInfo: cardInfoFile,
      revealCard: { 0: false, 1: false, 2: false, 3: false, 4: false },
      generatedCards: [],
      cardFocus: "Oraclecoverresults",
      showMenu: false,
      showInfo: false
    };
  },
  components: {
    QTransition,
    QBtn,
    appInfo: () => import("../InfoModal.vue")
  },
  computed: {
    focusPath: function() {
      return this.getPath(this.cardFocus);
    },
    cardProperty: function() {
        return Object.keys(this.getJsonItem())[0]
    },
    cardDescription: function() {
        return Object.values(this.getJsonItem())[0]
    }
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * max + min);
    },
    getPath(card) {
      //this method will return the card path of the given card name, the require statement is so that webpack knows that it will need this file and include it
      return require(`../../assets/cards/${card}.jpg`);
    },
    flipCard(index) {
      //takes the index of the card it's passed and sets the value at that index in revealCard array to true. This will visually flip the card to the user.
      // let indexState = this.revealCard.indexOf(index);
      this.revealCard[index] = true;
      this.cardFocus = this.generatedCards[index];
    },
    getJsonItem(lookup=this.cardFocus, obj=this.cardInfo) {
      for (let item in obj) {
        if (item == lookup) {
          return obj[item];
        } else if (obj[item] instanceof Object) {
          this.getJsonItem(lookup, obj[item]);
        }
      }
    },
  },
  created() {
    const self = this;
    //script to run when this component is made(after the users choices have been made)
    //cards will be generated here.
    console.log("Generating cards...");
    for (let i = 1; i <= this.numberOfCards; i++) {
      //generated a random number between 1 and 48 (48 cards in the deck)
      let num = this.randomNum(0, 48);
      let card = this.cards[num];

      //check to see if card is a duplicate or not; if it isn't then push card to generated cards list, if it is a duplicate then -1 from loop counter to generate another card.
      if (this.generatedCards.indexOf(card) === -1) {
        this.generatedCards.push(card);
      } else {
        i -= 1;
      }
    }
    // console.log(this.generatedCards);

    //function to automatically flip all cards upon load (just makes it a nide little animation)
    var autoFlip = (function() {
      for (let i = 0; i < 5; i++) {
        let delay = (i + 1) * 400;
        setTimeout(() => {
          self.revealCard[i] = true;
        }, delay);
      }
    })();

    setTimeout(() => {
      this.showMenu = true;
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-family: 'Vesper Libre', serif;
  text-align: center;
  color: white;
}
.results-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title-box {
  flex: 1 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.card-info {
  flex: 1 60%;
  width: 100%;
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cards {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  flex: 1 15%;
}

.card {
  height: 60px;
  width: 40px;
  border: 1px solid black;
  border-radius: 2px; // margin: 2%;
  // background-color: grey;
  & img {
    max-height: 100%;
    max-width: 100%;
    height: 60px;
    width: 40px;
  }
}

#card-focus {
  display: block;
  max-width: 230px;
  max-height: 400px;
  width: auto;
  height: auto;
}

.menu {
  font-family: 'Arvo', serif;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
  flex: 1 10%;
  width: 100%;
  height: 100%;
}
.btn {
  margin: 15px 0 0 0;
}
.card-info {
    font-weight: 500;
    font-size: 20px;
}
//change animation speed
.fadeInFast {
    -webkit-animation: fadeIn .3s;
    /* Safari 4+ */
    -moz-animation: fadeIn .3s;
    /* Fx 5+ */
    -o-animation: fadeIn .3s;
    /* Opera 12+ */
    animation: fadeIn .3s;
    /* IE 10+, Fx 29+ */
}

.fadeOutFast {
    -webkit-animation: fadeOut .3s;
    /* Safari 4+ */
    -moz-animation: fadeOut .3s;
    /* Fx 5+ */
    -o-animation: fadeOut .3s;
    /* Opera 12+ */
    animation: fadeOut .3s;
    /* IE 10+, Fx 29+ */
}
</style>

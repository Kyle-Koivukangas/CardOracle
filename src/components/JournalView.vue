<template>
    <div class="results-container">

        <div class="title-box">
            <slot name="note">
                <form action="">
                    <p>No note given </p>
                    <q-btn class="edit-btn" small>Edit</q-btn>
                    <!-- TODO: add note change functinoality -->
                </form>
            </slot>
        </div>

        <div class="card-info">
            <q-transition enter="fadeIn" leave="fadeOut">
                <img id="card-focus" @click="showInfo = true" :src="focusPath" alt="">
            </q-transition>
        </div>
        <q-transition enter="fadeInFast" leave="fadeOutFast">
            <app-info v-if="showInfo == true" :show="showInfo" @close="showInfo = false">
                <h3 slot="header">{{ cardFocus }}</h3>
                <p class="card-info" slot="body">{{ cardProperty }}<br><br><br>{{ cardDescription }}</p>
            </app-info>
        </q-transition>

        <div class="cards">
            <div v-for="(card, i) in cards.length" :key="i">
                <q-transition mode="out-in" enter="flipInY" leave="flipOutY">
                    <div class="card" v-if="revealCard[i] === false" key="cardBack">
                        <img class="card-img" :src="getPath('Oraclecover')" alt="" @click="flipCard(i)">
                    </div>
                    <div class="card" v-if="revealCard[i] === true" key="cardFront">
                        <img class="card-img" :src="getPath(cards[i])" alt="" @click="cardFocus = cards[i]">
                    </div>
                </q-transition>
            </div>
        </div>
        <!-- <q-btn icon="arrow back" color="blue" class="back-btn" @click="$emit('close')">Back</q-btn> -->


    </div>
</template>

<script>
import "quasar-extras/animate/flipInY.css";
import "quasar-extras/animate/flipOutY.css";
import "quasar-extras/animate/fadeIn.css";
import "quasar-extras/animate/fadeOut.css";

import { QBtn, QTransition } from "quasar";

import cardInfoFile from "../statics/cardInfo.json";

export default {
  props: ["cards"],
  data() {
    return {
      revealCard: { 0: false, 1: false, 2: false, 3: false, 4: false },
      cardFocus: "Oraclecoverresults",
      note: "No note given.",
      showInfo: false,
      cardInfo: cardInfoFile,
    };
  },
  components: {
    QTransition,
    QBtn,
    appInfo: () => import("./InfoModal.vue")
  },
  computed: {
    focusPath: function() {
      return this.getPath(this.cardFocus);
    },
    cardProperty: function() {
      return Object.keys(this.getJsonItem())[0];
    },
    cardDescription: function() {
      return Object.values(this.getJsonItem())[0];
    }
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * max + min);
    },
    getPath(card) {
      //this method will return the card path of the given card name, the require statement is so that webpack knows that it will need this file and include it
      return require(`../assets/cards/${card}.jpg`);
    },
    flipCard(index) {
      //takes the index of the card it's passed and sets the value at that index in revealCard array to true. This will visually flip the card to the user.
      // let indexState = this.revealCard.indexOf(index);
      this.revealCard[index] = true;
      this.cardFocus = this.cards[index];
    },
    showInfoModal(card) {
    //   this.cardFocus = card;
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
  },
  created() {
    const self = this;
    //function to automatically flip all cards upon load (just makes it a nice little animation)
    var autoFlip = (function() {
      for (let i = 0; i < 5; i++) {
        let delay = (i + 1) * 400;
        setTimeout(() => {
          self.revealCard[i] = true;
        }, delay);
      }
    })();
  }
};
</script>

<style lang="scss" scoped>
.results-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title-box {
  flex: 1 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-info {
  flex: 1 60%;
  width: 100%;
  text-align: center;
  color: white;
  // background-color: rgba(20, 20, 20, .5);
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
  max-width: 200px;
  max-height: 300px;
  width: auto;
  height: auto;
}

form,
p {
  display: inline;
  color: white;
}
// .back-btn {
//     float: right;
//     position: absolute;
//     bottom: 0;
//     right: 0;
// }
.edit-btn {
  background-color: rgba(100, 100, 120, 0.5);
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

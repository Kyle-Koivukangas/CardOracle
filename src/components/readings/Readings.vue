<template>
    <div class="readings-container">
        <q-transition mode="out-in" appear enter="fadeIn" leave="fadeOut">
            <div v-if="show === 'readingSize'" key="readingSize">
                <h3>Choose a Reading</h3><br> <br> <br> <br> <br> <br>
                <div class="menu">
                    <div class="btn-container">
                        <q-btn color="blue" :big="true" @click="readingSize = 1; show = 'prompt'">1 Card Reading</q-btn>
                    </div>
                    <div class="btn-container">
                        <q-btn color="blue" :big="true" @click="readingSize = 3; show = 'prompt'">3 Card Reading</q-btn>
                    </div>
                    <div class="btn-container">
                        <q-btn color="blue" :big="true" @click="readingSize = 5; show = 'prompt'">5 Card Reading</q-btn>
                    </div>
                </div>
            </div>

            <div class="prompt" v-if="show === 'prompt'" key="prompt" @click="show = 'choose'">
                    <p>Close your eyes and focus on the topic you want a reading about.</p>
                    <p>Call upon the universe, asking for her assistance...</p>
                    <p>Feel that the guidance you are about to receive is a wise and benevolent message that will help you on your path..</p>
                    <p>Then touch the screen to begin...</p>
            </div>

            <app-choose v-if="show === 'choose'" key="choose" :numberOfCards="readingSize" @chosen="show = 'results'"></app-choose>

            <app-results v-if="show === 'results'" key="results" :numberOfCards="readingSize"></app-results>
        </q-transition>

        <!-- <q-transition mode="out-in" enter="fadeIn" leave="fadeOut">

            </q-transition> -->
        <!-- 
            <q-transition mode="out-in" enter="fadeIn" leave="fadeOut">
            </q-transition> -->

    </div>
</template>

<script>
import Choose from "./Choose.vue";
import Results from "./Results.vue";

import "quasar-extras/animate/fadeIn.css";
import "quasar-extras/animate/fadeOut.css";
import { QBtn, QTransition } from "quasar";

export default {
  data() {
    return {
      show: "readingSize",
      readingSize: 1
    };
  },
  components: {
    appChoose: Choose,
    appResults: Results,
    QBtn,
    QTransition
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-family: "Vesper Libre", serif;
  text-align: center;
  color: white;
}

.readings-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: url("../../assets/background.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn-container {
  font-family: "Arvo", serif;
  font-weight: 400;
  margin: 20px auto 20px auto;
}

.prompt {
  font-family: "Vesper Libre", serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  font-size: 250%;
  & p {
    font-size: 0.8em;
    margin: 5% 2% 5% 2%;
    line-height: 1;
  }
}
</style>

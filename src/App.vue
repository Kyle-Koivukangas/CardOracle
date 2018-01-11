<template>
    <!-- Don't drop "q-app" class -->
    <div id="q-app">
        <q-transition appear mode="out-in" enter="fadeIn" leave="fadeOut">
            <router-view></router-view>
        </q-transition>
    </div>
</template>

<script>
import "quasar-extras/animate/fadeIn.css";
import "quasar-extras/animate/fadeOut.css";
import { QTransition } from "quasar";

export default {
  components: {
    QTransition
  }
};
</script>

<style lang="scss" scoped>
// @import '~variables';
@media screen and (min-width: 600px) {
  #q-app {
    width: 425px;
    height: 800px;
  }
}
@media screen and (max-width: 600px) {
  #q-app {
    height: 100%;
    width: 100%;
    // background-color: white;
    background-image: url("./assets/background.png");
    background-size: 100% 100%;
  }
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 10px; // background-color: $primary;
}
</style>

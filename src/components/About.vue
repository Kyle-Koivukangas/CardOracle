<template>
    <div class="about-page">
        <div class="border">
            <h1>About</h1>
            <p>Ingrid Koivukangas, BFA, MFA, is an award winning environmental artist, photographer, energy worker, publisher and educator. She works with site energies and dreams creating new work directly in response to natural sites, their history and Spirit, animal and plant connections.</p>
            <p><br>Her work has been exhibited internationally and has been included in numerous publications. She lives at Alchemy Farm on Salt Spring Island with her husband and their dog and cat children. The Alchemy Flower and Fairy Oracle is being released in 2018. Occasionally Ingrid offers readings - please check her <a href="www.ingridkoivukangas.com">website</a> for more information.</p>
        </div>
        <!-- <div></div> -->
        <div class="back-btn-cont" >
            <q-btn style="float: right; margin: 10px" icon="arrow back" color="blue" class="back-btn" @click="$router.push('/')">Back</q-btn>
        </div>
    </div>
</template>

<script>
import { QBtn } from "quasar";

export default {
  components: {
    QBtn
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Arvo|Goudy+Bookletter+1911|Sorts+Mill+Goudy|Trocchi');

.about-page {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-image: url("../assets/background.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
.border {
  margin: 25px;
  padding: 0 0 30px 0;
  background-color: rgba(20, 20, 20, 0.5);
  border-radius: 3px;
  flex: 1 90%;
}
h1 {
  font-family: 'Vesper Libre', serif; 
  color: white;
  text-align: center;
  margin: 35px 0 25px 0;
}
p {
  font-family: "Sorts Mill Goudy", serif;
  font-size: 1.2em;
  color: white;
  // text-align: center;
  margin: 0px 30px;
}
</style>

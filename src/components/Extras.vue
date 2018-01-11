<template>
    <div class="extras-page">
        <div class="border">
            <h1>Extras</h1>            
        </div>
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
.extras-page {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* background-color: #535353; */
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
  font-family: "Vesper Libre", serif;
  color: white;
  text-align: center;
}
</style>

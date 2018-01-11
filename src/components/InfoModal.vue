<template>
    <div class="modal-mask" @click="close()">
        <div class="modal-wrapper" > 
            <div class="modal-container" @click.stop>

                <div class="modal-header">
                    <slot name="header">
                        Default Header
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer"> 
                    <q-btn color="grey" @click="close()">Close</q-btn>
                  </slot>
                </div>

            </div>
        </div>
    </div>
    
</template>

<script>
import { QBtn } from "quasar";
import cardInfoFile from "../statics/cardInfo.json";

export default {
  props: ["show"],
  data() {
    return {
      title: "",
      body: ""
    };
  },
  components: {
    QBtn
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    escKeyDown(e) {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    },
  },
  created() {
    document.addEventListener("keydown", this.escKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.escKeyDown);
  }
};
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 0px;
  color: white !important;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  min-height: 150px;
  margin: 0px auto;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.55);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  color: white;
  font-family: Helvetica, Arial, sans-serif;
  text-shadow: 2px 1px darkslategray;
}

.modal-header h3 {
  font-family: 'Vesper Libre', serif;
  margin-top: 0;
  color: green;
  text-align: center;
}

.modal-body {
  font-family: 'Goudy Bookletter 1911', serif;
  // font-size: 1.4em;
  color: white;
  margin: 0px 0;
}
.modal-footer {
  font-family: 'Arvo', serif;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-default-button {
  // float: right;
  margin-bottom: 10px;
}
</style>

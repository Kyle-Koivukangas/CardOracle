<template>
    <div class="journal-page">
        <div class="title-box">
            <h2>Journal</h2>
        </div>

        <q-transition mode="out-in" enter="fadeIn" leave="fadeOut">
            <div v-if="!show" class="journal-items" key="journal-items">
                <div @click="showResults(item, key, index)" class="item" v-for="(item, key, index) in savedJournal" :key="item">
                    <p>Date: {{ key }} : <br> {{ item[0] }}</p>
                    <!-- <p>{{ show[index] }}</p> -->
                </div>
            </div>

            <div v-if="show" class="resultscontainer" key="journal-view">
                <app-journal-view v-if="show" :cards="focus.item.slice(1,7)" @close="show = false">
                    <div class="note" slot="note">
                        <form action="">
                            <q-btn class="edit-btn" small @click="showEditModal = true">Edit Note</q-btn>
                            <p class="date">{{ focus.key }}: </p> <br>
                            <p>{{ focus.item[0] }} </p>
                            <!-- TODO: add note change functionality -->
                        </form>
                    </div>
                </app-journal-view>
            </div>
        </q-transition>

        <q-transition>
            <app-card-modal v-if="showEditModal" @close="saveNote($event)">
                <P slot="header"></P>
                <div slot="body" class="edit">
                    <q-field class="edit-input" :count="100" helper="What is this reading about?">
                        <q-input v-model="note" dark color="blue" type="textarea" float-label="Edit Note" :max-length="100" :placeholder="'input a note about the reading here.'" />
                    </q-field>
                </div>
            </app-card-modal>
        </q-transition>
        
        <div class="back-btn-cont" >
            <q-transition mode="out-in" enter="fadeIn" leave="fadeOut">
                <q-btn v-if="show" icon="arrow back" color="blue" class="back-btn" @click="closeResults()">Back</q-btn>
                <q-btn v-if="!show" icon="arrow back" color="blue" class="back-btn" @click="$router.push('/')">Back</q-btn>
            </q-transition>    
        </div>
    </div>
</template>

<script>
import "quasar-extras/animate/fadeIn.css";
import "quasar-extras/animate/fadeOut.css";
import CardModal from "./CardModal.vue";
import Results from "./readings/Results.vue";
import JournalView from "./JournalView.vue";
import { QBtn, QTransition, QInput, QField } from "quasar";

export default {
  data() {
    return {
      items: [
        "this is a list",
        "a list of journal entries",
        "journal entries that should be saves of past readings"
      ],
      show: false,
      note: "",
      focus: {},
      showEditModal: false
    };
  },
  computed: {
    savedJournal() {
      //retrieve the locally saved journal and parse it back to object with JSON.parse()
      return JSON.parse(localStorage.getItem("testJournal"));
    }
  },
  methods: {
    save(item, value) {
      localStorage.setItem(item, JSON.stringify(value));
    },
    read(item) {
      console.log(localStorage);
      return localStorage[item];
    },
    saveNote(bool) {
      //add new note to the journal entry and then save the new journal to local storage
      if (bool) {
        this.focus.item[0] = this.note;
        let newJournal = this.savedJournal;
        newJournal[this.focus.key] = this.focus.item;
        this.save("testJournal", newJournal);
        console.log("NEW JOURNAL:");
        console.log(newJournal);
        console.log("AFTER SAVE, LOCAL STORAGE (parsed):");
        console.log(JSON.parse(localStorage.testJournal));
      }
      this.showEditModal = false;
    },
    showResults(data, date, indx) {
      this.focus = { item: data, key: date, index: indx };
      this.note = data[0];
      this.show = true;
      console.log(this.show);
    },
    closeResults() {
      console.log("closeResults()");
      this.show = false;
      console.log(this.show);
      const vm = this;
      setTimeout(() => {
        console.log(vm.show);
      }, 10000);
    }
  },
  components: {
    appCardModal: CardModal,
    appResults: Results,
    appJournalView: JournalView,
    QTransition,
    QBtn,
    QField,
    QInput
  },
  created() {
    //log saved local storage
    console.log(localStorage);

    //set test journal item, web storage only accepts strings
    localStorage.setItem(
      "testJournal",
      JSON.stringify({
        "2017/03/15 12:45PM": [
          "this is a reading and this note is a topic about the reading",
          "Ancestors",
          "Bear",
          "Bleeding Heart"
        ],
        "2017-07-08 1:52PM": [
          "while in development, this app will rewrite saved topics on refresh",
          "Butterfly",
          "Cedar",
          "Cougar"
        ],
        "2017-09-11 11:52AM": [
          "This journal entry is stored locally via web storage.",
          "Butterfly",
          "Cedar",
          "Cougar",
          "Ancestors",
          "Bear"
        ],
        "2017-09-11 09:52AM": [
          "This is a progressive web app, once loaded in to cache, it will work even without an internet connection.",
          "Butterfly",
          "Cedar",
          "Cougar",
          "Ancestors",
          "Bear"
        ]
      })
    ),
      console.log(this.savedJournal);
  }
};
</script>

<style lang="scss" scoped>
.journal-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: #535353; */
  background-image: url("../assets/background.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

h2 {
  font-family: 'Vesper Libre', serif;
  color: white;
  text-align: center;
  margin: 25% 0 0 0;
}

.title-box {
  flex: 1 9%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.journal-items {
  font-size: 1.3em;
  background-color: rgba(20, 20, 20, 0.5);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1 90%;
  margin: 10% 5% 10% 5%;
  border-radius: 5px;
  width: 90%;
}

.item {
  color: #999999; // height: 50px;
  width: 100%;
  padding: 0.5em; // overflow: hidden;
  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:nth-child(odd) {
    background-color: rgba(20, 20, 20, 0.4);
  }
  & p {
    margin: 0;
  }
}

.resultscontainer {
  background-color: rgba(20, 20, 20, 0.5);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1 95%;
  margin: 10% 5% 10% 5%;
  border-radius: 5px;
  width: 90%;
}

.date {
  line-height: 2em;
}

.note {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: inline;
  color: white;
  margin: 10px; // text-align: center;
}

.back-btn-cont {
  //   float: right;
  //   position: relative;
  //   bottom: 0;
  //   right: 0;
  width: 100%;
  align-content: right;
}

.back-btn {
  float: right;
  margin: 10px;
  //   position: relative;
  //   bottom: 0;
  //   right: 0;
}

.edit-btn {
  background-color: rgba(100, 100, 120, 0.5);
  float: right;
}

.edit-input {
  color: white;
}

//change animation speed
.fadeIn {
  -webkit-animation: fadeIn 0.3s;
  /* Safari 4+ */
  -moz-animation: fadeIn 0.3s;
  /* Fx 5+ */
  -o-animation: fadeIn 0.3s;
  /* Opera 12+ */
  animation: fadeIn 0.3s;
  /* IE 10+, Fx 29+ */
}

.fadeOut {
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
 
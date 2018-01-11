<template>
    <div class="content-div">
        <div class="menu-container">
            <div class="title-container">
                <h1>Eco Heart<br><br>Oracle</h1>
            </div>

            <div class="button-grid">
                <div class="button-container">
                    <q-btn class="btn" color="blue" @click="$router.push('readings')">Readings</q-btn>
                    <q-btn class="btn" color="blue" @click="$router.push('browse')">Browse</q-btn>
                </div>
                <div class="button-container">
                    <q-btn class="btn" color="blue" @click="$router.push('journal')">Journal</q-btn>
                    <q-btn class="btn" color="blue" @click="$router.push('about')">About</q-btn>
                </div>
                <div class="button-container">
                    <q-btn class="btn" color="blue" @click="$router.push('extras')">Extras</q-btn>
                    <q-btn class="btn" color="blue" @click="$router.push('ecoHeart')">Eco Heart</q-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {QBtn} from 'quasar'

export default {
    components: {
        QBtn,
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Arvo|Goudy+Bookletter+1911|Sorts+Mill+Goudy|Trocchi|Vesper+Libre');
/* Portrait layout (default) */

// .app {
//     /* background:url(../img/earthlogo.png) no-repeat center;  170px x 200px  */
//     position: absolute;
//     /* position in the center of the screen */
//     left: 50%;
//     top: 50%;
//     height: 50px;
//     /* text area height */
//     width: 225px;
//     /* text area width */
//     text-align: center;
//     padding: 180px 0px 0px 0px;
//     /* image height is 200px (bottom 20px are overlapped with text) */
//     margin: -115px 0px 0px -112px;
//     /* offset vertical: half of image height and text area height */
//     /* offset horizontal: half of text area width */
// }
.btn {
    font-family: 'Arvo', serif;
    font-weight: 600;    
    flex: 2 30%;
    // margin-left: 3%;
    // margin-right: 3%;
    // margin-bottom: 0%;
    height: 55px;
    margin: 15px;

}

h1 {
    font-family: 'Vesper Libre', serif;
    font-size: 54px;
    font-weight: normal;
    margin: 0px;
    overflow: visible;
    padding: 0px;
    text-align: center;
    color: white;
}

h2 {
    font-size: 34px;
    text-align: center;
    text-shadow: 0 0 10px #fdfcd9;
    color: #ffffff;
}

h3 {
    font-size: 22px;
    text-align: center;
    text-shadow: 0 0 10px #fdfcd9;
    color: #0f0d31;
}

.event {
    border-radius: 4px;
    -webkit-border-radius: 4px;
    color: #FFFFFF;
    font-size: 12px;
    margin: 0px 30px;
    padding: 2px 0px;
}

.event.listening {
    background-color: #333333;
    display: block;
}

.event.received {
    background-color: #4B946A;
    display: none;
}

@keyframes fade {
    from {
        opacity: 1.0;
    }
    50% {
        opacity: 0.4;
    }
    to {
        opacity: 1.0;
    }
}

@-webkit-keyframes fade {
    from {
        opacity: 1.0;
    }
    50% {
        opacity: 0.4;
    }
    to {
        opacity: 1.0;
    }
}

.blink {
    animation: fade 3000ms infinite;
    -webkit-animation: fade 3000ms infinite;
}

.content-div {
    top: 0px;
    /* Header Height */
    bottom: 0px;
    /* Footer Height */
    width: 100%;
    height: 100%;
}

.menu-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* background-color: #535353; */
    background-image: url('../assets/background.png');
    background-size: 100% 100%;
    // position: absolute;
    // height: 100%;
    // top: 0px;
    /* Header Height */
    // bottom: 0px;
    /* Footer Height */
    width: 100%;
    height: 100%;
}

.title-container {
    /* background-color: #36ed44; */
    flex: 1 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-grid {
    /* background-color: #f2e10d;     */
    flex: 1 30%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 0%;
    align-content: space-around;
    justify-content: space-between;
    padding-bottom: 6%;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-around;
    padding-right: 5%;
    padding-left: 5%;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2 30%;
    background-color: #d0cfb0;
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 0%;
    // height: 55%;
    height: 55px;
    margin: 15px;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
}
</style>
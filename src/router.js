import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu from '@/Menu.vue'
import Browse from '@/Browse.vue'
import Readings from '@/readings/Readings.vue'
import Journal from '@/Journal.vue'
import About from '@/About.vue'
import Extras from '@/Extras.vue'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: Menu },
    { path: '/browse', component: Browse, name: 'browse' },
    { path: '/readings', component: Readings, name: 'readings' },
    { path: '/Journal', component: Journal, name: 'journal' },
    { path: '/About', component: About, name: 'about' },
    { path: '/Extras', component: Extras, name: 'extras' },
    { path: '/ecoHeart', name: 'ecoHeart', 
      beforeEnter: (to, from, next) => {
          window.location = "https://www.ecoheartdesign.com/"
      }
    },
    
  ]
})

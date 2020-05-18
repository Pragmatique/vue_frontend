<template>
  <v-navigation-drawer
    v-model="toggle"
    fixed app>

    <v-toolbar flat dark :color="themeColor" class="toolbar">
      <router-link :to="{ name: 'Dashboard' }">
      </router-link>
      <router-link :to="{ name: 'Dashboard' }" class="text">
         Menu
      </router-link>
    </v-toolbar>
    <v-list>

      <v-list-item @click="$router.push({ name: 'Profile' })">
        <v-list-item-action>
          <v-icon>dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-title :class="[{'active': selectedIndex === 2}, 'item-title' ]" >Profile manager</v-list-item-title>
      </v-list-item>

      <v-list-item @click="$router.push({ name: 'Shops' })">
        <v-list-item-action>
          <v-icon>calendar_today</v-icon>
        </v-list-item-action>
        <v-list-item-title :class="[{'active': selectedIndex === 3}, 'item-title' ]">Shop manager</v-list-item-title>
      </v-list-item>

      <v-list-item @click="$router.push({ name: 'RegistrationForm' })">
        <v-list-item-action>
          <v-icon>event_note</v-icon>
        </v-list-item-action>
        <v-list-item-title :class="[{'active': selectedIndex === 4}, 'item-title' ]">Registration</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  props: {
    toggle: {
        type: Boolean,
        required: false,
        default: true
    }
  },
  data() {
    return {
      selectedIndex: 1,
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ]
    }
  },
  computed: {
      /*...mapState('authuser', ['colorForTheme']),*/
      ...mapGetters('authuser', ['themeColor'])
      /*colorForTheme: {
        get: ()=> {debugger; return this.$store.dispatch('authuser/themeColor',null, {root:true})},
        set: async (newValue)=> {await this.$store.dispatch('authuser/setThemeColor', newValue , {root:true})}
      }*/
  },
  methods: {
    changeRoute(routeName, selectedIndex) {
      const vm = this;
      vm.selectedIndex = selectedIndex;
      return vm.$router.push({ name: routeName });
    }
  }
}
</script>

<style>
  .toolbar {
    font-weight: bold;
    font-size: 18px;
  }
  .toolbar .text {
    padding-left: 15px;
    color: white;
    text-decoration:none;
  }
  .item-title {
    font-size: 17px;
    font-weight: 500;
  }
  .item-sub-title {
    font-size: 15px;
    font-weight: 500;
  }
  .active {
    font-weight: bold;
  }
</style>
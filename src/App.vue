<template>
  <div>
    <template>
      <v-app id="inspire">
        <div class="app-container">
          <toolbar :key="$route.params.userId" @toggleNavigationBar="drawer = !drawer"/>
          <navigation :toggle="drawer"/>
          <v-content>
            <breadcrumbs> </breadcrumbs>
            <router-view> </router-view>
          </v-content>
        </div>
      </v-app>
    </template>
  </div>
</template>

<script>
import Navigation from '@/components/core/NavigationDrawer';
import Toolbar from '@/components/core/Toolbar';

export default {
  name: 'App',
  components: {
      Navigation,
      Toolbar
  },

  data() {
    return {
      drawer: true
    }
  }

}
</script>

<style>
</style>

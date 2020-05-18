<template>
  <v-app-bar
    dark
    app
    :color="colorForTheme">
    <v-toolbar-title>
      <v-app-bar-nav-icon @click="toggleNavigationBar"></v-app-bar-nav-icon>
      {{ $root.firstNameCompany }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-dialog
      v-model="dialogSettings"
      width="700">
      <v-card >
        <v-card-title class="headling"
          primary-title>
          Settings
        </v-card-title>

        <v-card-text>
          Pick a color for the panel?
          <swatches v-model="colorForTheme"
            inline colors="material-dark" :exceptions="['#FFFFFF']" shapes="circles" show-border>
          </swatches>
        </v-card-text>
        <v-card-text>
          User settings
          <v-form>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 xs6 md11>
                  <v-text-field
                    v-model="userEmail"
                    label="Email"
                    hint="Email can not be changed"/>
                </v-flex>

                <v-flex xs12 xs6 md1 />

                <v-flex xs12 sm6 md11>
                  <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    label="New password"
                    hint="Pick better password.."
                    :error="error"
                    @click:append="showPassword = !showPassword" />
                </v-flex>

                <v-flex xs12 sm6 md1 />

                <v-flex xs12 sm6 md11>
                  <v-text-field
                    v-model="passwordConfirm"
                    :append-icon="showPasswordConfirm ? 'visibility_off' : 'visibility'"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    label="Repeat new password"
                    hint="and confirm it.."
                    :error="error"
                    @click:append="showPasswordConfirm = !showPasswordConfirm" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="setUpSettings">
            Change password
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="showResult"
      :color= "snackbarColor"
      :timeout="2000"
      top>
      {{ result }}
    </v-snackbar>

    <v-menu offset-y offset-x :nudge-bottom="10" transition="scale-transition">
      <template v-slot:activator="{ on }">
          <v-btn icon large text v-on="on" :ripple="false">
            <v-avatar v-if="userData && userData.profile.photo">
              <img
                :src="userData.profile.photo"
                :alt="userData.first_name"
              >
            </v-avatar>
            <v-avatar v-else>
              <v-icon large>account_circle</v-icon>
            </v-avatar>
          </v-btn>
      </template>
      <v-list >
        <v-list-item
          v-for="(item,index) in items"
          color = "black"
          :key="index"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          @click="item.click">

          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import "vue-swatches/dist/vue-swatches.css"
export default {
  data() {
    return {
      colorForTheme: this.$store.state.authuser.themeColor,
      //userData: this.$store.state.authuser.userFull,
      snackbarColor: 'error',
      rating: null,
      dialog: false,
      dialogSettings: false,
      switchEmailNotification: true,
      showPassword: null,
      showPasswordConfirm: null,
      userEmail: null,
      password: null,
      passwordConfirm: null,
      error: false,
      showResult: false,
      result: '',
      items: [
        {
          icon: 'fingerprint',
          //href: '#',
          title: 'Sign in',
          click: (e) => {
            this.$router.push({ name: 'Login' });
          }
        },
        {
          icon: 'account_circle',
          //href: '#',
          title: 'Profile',
          click: (e) => {
            this.$router.push({ name: 'Profile' })
          }
        },
        {
          icon: 'settings',
          //href: '#',
          title: 'Settings',
          click: () => {
            const vm = this;
            vm.dialogSettings = true;
          }
        },
        {
          icon: 'exit_to_app',
          //href: '#',
          title: 'Sign out',
          click: () => {
            const vm = this;
            vm.$store.dispatch('authuser/logout',null,{root:true});
            vm.$router.push({ name: 'Login' });
          }
        }
      ],
    }
  },
  computed: {
      ...mapGetters('authuser', ['userFull']),
      ...mapState('authuser', ['user','passwordChangeSuccess']),
      userData() {return this.$store.state.authuser.userFull}
      /*,
      ...mapGetters('authuser', ['userFull'])*/
      /*colorForTheme: {
        get: ()=> {debugger; return this.$store.dispatch('authuser/themeColor',null, {root:true})},
        set: async (newValue)=> {await this.$store.dispatch('authuser/setThemeColor', newValue , {root:true})}
      }*/
  },
  watch: {
    colorForTheme: function (val, oldVal) {
      this.$store.dispatch('authuser/setThemeColor', val , {root:true})
    }
  },
  methods: {
    toggleNavigationBar() {
      const vm = this;
      vm.$emit('toggleNavigationBar');
    },
    async setUpSettings() {
      const vm = this;
      if (vm.userEmail === null || vm.password === null || vm.passwordConfirm === null) {
        vm.result = "Email and Password can not be blank";
        vm.showResult = true;
        return;
      }
      if (vm.password !== vm.passwordConfirm) {
        vm.error = true;
        vm.result = "Passwords must match...";
        vm.showResult = true;
        return;
      }
      vm.$root.userEmail = vm.userEmail;
      vm.$root.userPassword = vm.password;
      await this.$store.dispatch('authuser/changePassword', {password: vm.password}, {root:true});
      if (this.passwordChangeSuccess) {
        vm.result = "Password was successfully changed";
        vm.showResult = true;
        vm.dialogSettings = false;
      } else {
        vm.error = true;
        vm.result = "Password change is unsuccessful";
        vm.showResult = true;
      }
    }
  },
  beforeMount () {
    //this.themeColor = this.$store.state.authuser.themeColor
    //this.$store.dispatch('authuser/getCurrentUser',null,{root:true})
    //console.log(this.$store.state.authuser.userFull)
  }
};
</script>
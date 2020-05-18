<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">Please, input user data</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="email"
                    label="Email"
                    type="text"
                    v-model="userEmail"
                    :error="error"
                    :rules="[rules.required, rules.email]"/>
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"/>
                  <v-text-field
                    :type="text"
                    name="first_name"
                    label="First name"
                    id="first_name"
                    v-model="first_name"
                    :error="error"/>
                  <v-text-field
                    :type="text"
                    name="last_name"
                    label="Last name"
                    id="last_name"
                    v-model="last_name"
                    :error="error"/>

                  <v-container>
                    <v-row>
                      <v-col cols="12" lg="12">
                        <v-menu
                         ref="menu"
                         v-model="menu"
                         :close-on-content-click="false"
                         :return-value.sync="date_of_birth"
                         transition="scale-transition"
                         offset-y
                         min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                              <v-text-field
                                 v-model="date_of_birth"
                                 name="date_of_birth"
                                 label="Date of birth"
                                 prepend-icon="event"
                                 readonly
                                 v-on="on"
                              ></v-text-field>
                          </template>
                          <v-date-picker v-model="date_of_birth" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date_of_birth)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="registration" :loading="loading">Registration</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        v-model="showResult"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      userEmail: '',
      password: '',
      first_name: '',
      last_name: '',
      date_of_birth: new Date().toISOString().substr(0, 10),
      menu: false,
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value,
        email: value => !!(value).match(/@/),
      }
    }
  },
  computed: {
      ...mapState('authuser', ['request_error'])
  },

  methods: {
    async registration() {

      if (!this.userEmail || !this.password) {
        this.result = "Email and Password can't be empty";
        this.showResult = true;
        return;
      }

      let email = this.userEmail;
      let password = this.password;
      let first_name = this.first_name;
      let last_name = this.last_name;
      let date_of_birth = this.date_of_birth;
      console.log(email, password);
      await this.$store.dispatch('authuser/createUser', {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        date_of_birth: date_of_birth
      }, {root:true});

      if (this.request_error === null) {
        this.result = "We send you verification link on email. You can sign in only after verification!";
        this.showResult = true;
        this.$router.push({ name: 'Dashboard' });
      }
      else {
        //this.error = true;
        //this.result = "Something went wrong";
        this.result = this.request_error;
        this.showResult = true;
      }
    }
  }
}
</script>

<style scoped lang="css">
  #registration {
    height: 10%;
    width: 20%;


  }
</style>

<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">Hello {{userEmail}} </h1>
                </div>
                <v-form>
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
                <v-btn block color="primary" @click="update" :loading="loading">Change user data</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        v-model="showResult"
        :timeout="4000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      userEmail: this.$store.state.authuser.user.email,
      password: '',
      user_id: this.$store.state.authuser.user.id,
      first_name: this.$store.state.authuser.user.first_name,
      last_name: this.$store.state.authuser.user.last_name,
      date_of_birth: this.$store.state.authuser.user.date_of_birth,
      menu: false,
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required',
        email: value => (value || '').match(/@/) || 'Input correct email',
      }
    }
  },
  computed: {
      ...mapState('authuser', ['request_error']),
      ...mapGetters('authuser', ['user'])
  },

  methods: {
    async update() {

      await this.$store.dispatch('authuser/updateProfile', {
        id: this.user_id,
        first_name: this.first_name,
        last_name: this.last_name,
        date_of_birth: this.date_of_birth
      }, {root:true});

      if (this.request_error === null) {
        this.result = "User data updated";
        this.showResult = true;
        this.$router.push({ name: 'Dashboard' });
      }
      else {
        //this.error = true;
        //this.result = "Something went wrong";
        this.result = this.request_error;
        this.showResult = true;
      }
    },
    async load_data() {
      user = this.$store.state.authuser.user
      this.userEmail = user.email
      this.first_name = user.first_name,
      this.last_name = user.last_name,
      this.date_of_birth = user.date_of_birth
    }
  },
  beforeMount () {
    //this.themeColor = this.$store.state.authuser.themeColor
    if (!this.$store.state.authuser.user){
        this.$store.dispatch('authuser/getCurrentUser',null,{root:true})
    }
    //console.log(this.$store.state.authuser.user)
  }
}
</script>



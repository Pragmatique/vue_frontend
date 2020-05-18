<template>
  <div>
    <v-snackbar
      v-model="showResult"
      :color= "snackbarColor"
      :timeout="2000"
      top>
      {{ result }}
    </v-snackbar>
    <v-container fluid>
      <v-card>
        <v-container fluid>
          <v-layout row align-center>
            <v-flex shrink xs4 offset-xs4>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="blue" v-on="on">Add shop</v-btn>
                </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Shop name</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 md12>
                            <v-text-field label="Input new shop name" required v-model='new_property_type'></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click.native="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" text @click.native="dialog = false" @click="addItem(new_property_type)">Create</v-btn>
                    </v-card-actions>
                  </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-container>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-card v-for="(shop, index) in shops" :key="index" class="mb-3">
      <v-container fluid>
        <v-layout row justify-space-between>
          <v-flex shrink xs10>
            <v-card-title class="title">
              {{ shop.name }}
            </v-card-title>
          </v-flex>
          <v-flex shrink xs2>
              <v-dialog v-model="dialogConfirm" persistent max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="red" v-on="on">Delete</v-btn>
                </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Are you sure, you want to delete shop?</span>
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click.native="dialogConfirm = false">No</v-btn>
                      <v-btn color="blue darken-1" text @click.native="dialogConfirm = false" @click="removeItem(shop.id)">Yes</v-btn>
                    </v-card-actions>
                  </v-card>
              </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

export default {
    data() {
      return {
        snackbarColor: 'error',
        dialog: false,
        dialogConfirm: false,
        on: true,
        new_property_type: '',
        error: false,
        showResult: false,
        result: '',
      }
    },
    computed: {
      ...mapGetters('shop', ['shops']),
      ...mapState('authuser', ['userId']),
    },
    methods: {
      async removeItem (id) {

        await this.$store.dispatch('shop/deleteShop',
          id,
          {root:true}
        );
      },
      async addItem (new_property_type) {

        if (this.new_property_type === '') {
          this.error = true;
          this.result = "Shop name can not be blank";
          this.showResult = true;
          return;
        } else {
          await this.$store.dispatch('shop/createShop',
            {name: this.new_property_type,
             owner: this.userId},
            {root:true}
          );
          this.new_property_type='';
        }
      }
    },
    beforeMount () {
      this.$store.dispatch('shop/getShops',null,{root:true})
    }


}
</script>

<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      color="blue"
    ></loading>
    <v-container>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-card class="mx-auto mt-10" style="border-color:#9E9E9E;" outlined>
        <v-container>
          <v-row class="ml-2 mr-2">
            <v-col cols="3" sm="3">
              ID
            </v-col>
            <v-col cols="8" sm="8">
              Template Name
            </v-col>
          </v-row>
          <v-row
            class="mr-1 ml-1"
            style="height:1px; background-color:#9E9E9E;"
          />
          <v-row
            class="ml-2 mr-2"
            v-for="(item, index) in this.TempTempate"
            :key="index"
          >
            <v-col cols="4" sm="3">
              <div class="subtitle-2">
                {{ item._id }}
              </div>
            </v-col>
            <v-col cols="4" sm="4">
              {{ item.Template_name }}
            </v-col>
            <v-col cols="2" sm="2">
              3 คน
            </v-col>
            <v-col cols="2" sm="3">
              <v-icon
                color="blue lighten-2"
                class="mr-3"
                @click="assignTo(item)"
              >
                account_box
              </v-icon>
              <router-link :to="{ path: '/edit/' + item._id }">
                <v-icon color="green lighten-2" class="mr-3">
                  edit
                </v-icon>
              </router-link>
              <v-icon color="red lighten-2" @click="deleted(item._id)">
                delete
              </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-row class="mt-5">
        <v-col>
          <div>รายชื่อพนักงานที่ได้รับมอบหมาย</div>
        </v-col>
        <v-col>
          <div>รายชื่อพนักงานที่ยังไม่ได้ได้รับมอบหมาย</div>
        </v-col>
      </v-row>
      <v-multiselect-listbox
        :options="[
          { name: 'Alabama', id: 1 },
          { name: 'California', id: 22 },
          { name: 'Arm', id: 41 },
          { name: 'Min', id: 19 }
        ]"
        :reduce-display-property="option => option.name"
        :reduce-value-property="option => option.id"
        no-options-text="ว่าง.."
        selected-no-options-text="ยังไม่ได้เลือก.."
        :show-select-all-buttons="true"
        search-options-placeholder="ค้นหาชื่อพนักงาน..."
        selected-options-placeholder="ค้นหาชื่อพนักงานที่ถูกเลือก..."
        search-input-class="custom-input-class"
        style="width: 100%"
        v-model="UserSelected"
      >
        >
      </v-multiselect-listbox>
    </v-container>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn @click="Save" color="success">Save</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import vMultiselectListbox from "vue-multiselect-listbox";
import "vue-multiselect-listbox/dist/vue-multi-select-listbox.css";
import axios from "axios";
import Swal from "sweetalert2";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "NewAssign",
  components: {
    vMultiselectListbox,
    Loading
  },
  mounted() {
    axios
      .get("https://kpis-backend.herokuapp.com/QuestionAdd")
      .then(res => {
        this.TempTempate = res.data;
        this.isLoading = false;
        console.log(this.TempTempate);
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      search: "",
      Mockup: [],
      UserSelected: [],
      TempTempate: null,
      isLoading: true,
      fullPage: true
    };
  },
  methods: {
    assignTo(item) {
      console.log(item);
    },
    Save() {
      console.log(this.UserSelected);
    },
    deleted(id) {
      axios
        .delete("https://kpis-backend.herokuapp.com/QuestionAdd/delete/" + id)
        .then(res => {
          if (res.data) {
            Swal.fire({
              icon: "success",
              title: "Deleted !",
              showConfirmButton: false,
              timer: 1500
            });
            // location.reload();
            setTimeout(() => {
              this.TempTempate = this.TempTempate.filter(
                template => template._id != id
              );
            }, 1500);
          }
        })
        .catch(err => console.log(err));
    },
    onCancel() {
      console.log("User cancelled the loader.");
    }
  }
};
</script>

<style>
.card-border {
  border-color: black;
  width: 1000px;
}
.custom-input-class {
  background-color: #eceff1;
  width: 100%;
  height: 20%;
}
a {
  text-decoration: none;
}
</style>

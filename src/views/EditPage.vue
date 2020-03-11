<template>
  <div id="EditScreen">
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
      color="blue"
    ></loading>
    <v-card>
      <v-toolbar flat color="cyan" dark>
        <v-toolbar-title>คำถาม ?</v-toolbar-title>
      </v-toolbar>
      <v-tabs color="red" vertical>
        <v-tab
          v-for="(item, index) in this.assignTitle"
          :key="index"
          @click="selectTab = index"
        >
          <v-icon left>mdi-account</v-icon>
          {{ item.title }}
        </v-tab>
        <v-tab-item v-for="(item, index) in this.data.questions" :key="index">
          <v-card flat>
            <v-card-text>
              <!-- เริ่ม form -->
              <v-form
                v-if="index === selectTab"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-container>
                  <v-card
                    class="mx-auto"
                    style="border-color:#9E9E9E;"
                    max-width="1000"
                    outlined
                  >
                    <v-container>
                      <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                            v-model="item.KPI_Type_id"
                            :rules="[v => !!v || 'โปรดเลือกรูปแบบการประเมิณผล']"
                            :items="selectTamplate"
                            label="รูปแบบการประเมิณผล"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                            v-model="item.InsertTagetToChief"
                            :rules="[
                              v => !!v || 'โปรดเลือกเป้าหมายที่สอดคล้อง'
                            ]"
                            :items="selectinsertTagetToChief"
                            label="เป้าหมายที่สอดคล้อง"
                            outlined
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                  <v-card
                    class="mx-auto mt-4"
                    style="border-color:#9E9E9E;"
                    max-width="1000"
                    outlined
                  >
                    <v-container>
                      <v-row>
                        <v-container>
                          <v-col class="mx-auto pa-0" cols="12" sm="12">
                            <v-text-field
                              v-model="item.KPI_name"
                              label="ผลสัมฤทธิ์ที่คาดหวัง"
                              :rules="[
                                v => !!v || 'โปรดกรอกผลสัมฤทธิ์ที่คาดหวัง'
                              ]"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col class="mx-auto pa-0" cols="12" sm="12">
                            <v-text-field
                              v-model="item.KPI_detail"
                              label="ตัวชี้วัดผลการปฏิบัติงาน"
                              :rules="[
                                v => !!v || 'โปรดกรอกตัวชี้วัดผลการปฏิบัติงาน'
                              ]"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col class="pa-0" cols="12" sm="4">
                            <v-select
                              v-model="item.KPI_weight"
                              :rules="[v => !!v || 'โปรดเลือกความสำคัญ']"
                              :items="selectPriority"
                              label="ความสำคัญ"
                              outlined
                            ></v-select>
                          </v-col>
                          <v-col class="pa-0" cols="12" sm="4"
                            >ระดับการประเมิณ :
                          </v-col>
                          <v-row>
                            <v-col class="pa-0" cols="12" sm="12">
                              <v-container>
                                <v-row>
                                  <v-col
                                    class="pa-0 pl-4 pt-2 body-2"
                                    cols="3"
                                    sm="2"
                                    >(5) ดีเด่น :
                                  </v-col>
                                  <v-col class="pa-0 pr-4" cols="9" sm="10">
                                    <v-text-field
                                      v-model="
                                        item.Indicators[0].indicator_detail
                                      "
                                      label="รายละเอียด"
                                      :rules="[
                                        v => !!v || 'โปรดกรอกรายละเอียด'
                                      ]"
                                      outlined
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    class="pa-0 pl-4 pt-2 body-2"
                                    cols="3"
                                    sm="2"
                                    >(4) เกินกว่าที่คาดหวัง :
                                  </v-col>
                                  <v-col class="pa-0 pr-4" cols="9" sm="10">
                                    <v-text-field
                                      v-model="
                                        item.Indicators[1].indicator_detail
                                      "
                                      label="รายละเอียด"
                                      :rules="[
                                        v => !!v || 'โปรดกรอกรายละเอียด'
                                      ]"
                                      outlined
                                    ></v-text-field>
                                  </v-col>

                                  <v-col
                                    class="pa-0 pl-4 pt-2 body-2"
                                    cols="3"
                                    sm="2"
                                    >(3) บรรลุตามที่คาดหวัง :
                                  </v-col>
                                  <v-col class="pa-0 pr-4" cols="9" sm="10">
                                    <v-text-field
                                      v-model="
                                        item.Indicators[2].indicator_detail
                                      "
                                      label="รายละเอียด"
                                      :rules="[
                                        v => !!v || 'โปรดกรอกรายละเอียด'
                                      ]"
                                      outlined
                                    ></v-text-field>
                                  </v-col>

                                  <v-col
                                    class="pa-0 pl-4 pt-2 body-2"
                                    cols="3"
                                    sm="2"
                                    >(2) ต่ำกว่าที่คาดหวัง :
                                  </v-col>
                                  <v-col class="pa-0 pr-4" cols="9" sm="10">
                                    <v-text-field
                                      v-model="
                                        item.Indicators[3].indicator_detail
                                      "
                                      label="รายละเอียด"
                                      :rules="[
                                        v => !!v || 'โปรดกรอกรายละเอียด'
                                      ]"
                                      outlined
                                    ></v-text-field>
                                  </v-col>

                                  <v-col
                                    class="pa-0 pl-4 pt-2 body-2"
                                    cols="3"
                                    sm="2"
                                    >(1) ต้องปรับปรุง :
                                  </v-col>
                                  <v-col class="pa-0 pr-4" cols="9" sm="10">
                                    <v-text-field
                                      v-model="
                                        item.Indicators[4].indicator_detail
                                      "
                                      label="รายละเอียด"
                                      :rules="[
                                        v => !!v || 'โปรดกรอกรายละเอียด'
                                      ]"
                                      outlined
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-row>
                      <v-btn color="success" class="mr-4 mt-2" @click="submit"
                        >อัปเดต</v-btn
                      >
                    </v-container>
                  </v-card>
                </v-container>
              </v-form>
              <!-- end form -->
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "templateScreen",
  mounted() {
    axios
      .get(
        "https://kpis-backend.herokuapp.com/QuestionAdd/" +
          this.$route.params.id
      )
      .then(res => {
        this.data = res.data;
        // console.log(this.data);
        this.isLoading = false;
        this.assignTitle = this.data.questions.map((item, i) => {
          return {
            title: "คำถาม " + (i + 1),
            Template_id: item.Template_id,
            KPI_Type_id: item.KPI_Type_id,
            KPI_name: item.KPI_name,
            KPI_detail: item.KPI_detail,
            KPI_weight: item.KPI_weight,
            InsertTagetToChief: item.InsertTagetToChief,
            start_date: item.start_date,
            end_date: item.end_date,
            Indicators: item.Indicators
          };
        });
        // console.log(this.assignTitle);
      })
      .catch(err => console.log(err));
  },
  components:{
    Loading
  },
  data() {
    return {
      valid: true,
      selectTamplate: [
        {
          text: "เป้าหมายเชิงยุทศาสตร์",
          value: 1
        },
        {
          text: "เป้าหมายด้านอื่นๆ",
          value: 2
        }
      ],
      selectPriority: [
        {
          id: 1,
          text: "มาก",
          value: 3
        },
        {
          id: 2,
          text: "ปานกลาง",
          value: 2
        },
        {
          id: 3,
          text: "น้อย",
          value: 1
        }
      ],
      selectinsertTagetToChief: [
        {
          text: "สอดคล้องกับทางผู้บริหาร",
          value: 1
        },
        {
          text: "สอดคล้องกับเป้าหมายบุคคล",
          value: 2
        },
        {
          text: "สอดคล้องเบื้องต้น",
          value: 3
        }
      ],
      data: { questions: [] },
      assignTitle: null,
      selectTab: 0,
      isLoading: true,
      fullPage: true
    };
  },
  methods: {
    submit() {
      // if (this.$refs.form.validate()) {
      //   this.snackbar = true;
      // }
      this.isLoading = true
      const EditObject = this.data;
      console.log(EditObject);
      
      axios.put(
          "https://kpis-backend.herokuapp.com/QuestionAdd/" + this.$route.params.id, EditObject
        )
        .then(res => {
          if (res.data) {
            Swal.fire({
              icon: "success",
              title: "Update Success",
              showConfirmButton: false,
              timer: 1500
            });
            this.isLoading = false
            setTimeout(()=> { location = 'http://localhost:8081/edit/' + this.$route.params.id} , 1500 )
          }
        })
        .catch(err => console.log(err));
      // this.$router.push({ path: "/assign" });
    },
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 0.1px solid #000;
  text-align: left;
  padding: 8px;
  text-align: center;
}
</style>

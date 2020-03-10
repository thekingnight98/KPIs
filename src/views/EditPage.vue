<template>
  <div id="EditScreen">
    <v-form ref="form" v-for="(item, index) in this.data" :key="index" v-model="valid" lazy-validation>
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
                  :rules="[v => !!v || 'โปรดเลือกเป้าหมายที่สอดคล้อง']"
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
                    :rules="[v => !!v || 'โปรดกรอกผลสัมฤทธิ์ที่คาดหวัง']"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="mx-auto pa-0" cols="12" sm="12">
                  <v-text-field
                    v-model="item.KPI_detail"
                    label="ตัวชี้วัดผลการปฏิบัติงาน"
                    :rules="[v => !!v || 'โปรดกรอกตัวชี้วัดผลการปฏิบัติงาน']"
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
                <v-col class="pa-0" cols="12" sm="4">ระดับการประเมิณ : </v-col>
                <v-row>
                  <v-col class="pa-0" cols="12" sm="12">
                    <v-container>
                      <v-row>
                        <v-col class="pa-0 pl-4 pt-2 body-2" cols="3" sm="2"
                          >(5) ดีเด่น :
                        </v-col>
                        <v-col class="pa-0 pr-4" cols="9" sm="10">
                          <v-text-field
                            v-model="item.Indicators[0].indicator_detail"
                            label="รายละเอียด"
                            :rules="[v => !!v || 'โปรดกรอกรายละเอียด']"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col class="pa-0 pl-4 pt-2 body-2" cols="3" sm="2"
                          >(4) เกินกว่าที่คาดหวัง :
                        </v-col>
                        <v-col class="pa-0 pr-4" cols="9" sm="10">
                          <v-text-field
                            v-model="item.Indicators[1].indicator_detail"
                            label="รายละเอียด"
                            :rules="[v => !!v || 'โปรดกรอกรายละเอียด']"
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="pa-0 pl-4 pt-2 body-2" cols="3" sm="2"
                          >(3) บรรลุตามที่คาดหวัง :
                        </v-col>
                        <v-col class="pa-0 pr-4" cols="9" sm="10">
                          <v-text-field
                            v-model="item.Indicators[2].indicator_detail"
                            label="รายละเอียด"
                            :rules="[v => !!v || 'โปรดกรอกรายละเอียด']"
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="pa-0 pl-4 pt-2 body-2" cols="3" sm="2"
                          >(2) ต่ำกว่าที่คาดหวัง :
                        </v-col>
                        <v-col class="pa-0 pr-4" cols="9" sm="10">
                          <v-text-field
                            v-model="item.Indicators[3].indicator_detail"
                            label="รายละเอียด"
                            :rules="[v => !!v || 'โปรดกรอกรายละเอียด']"
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="pa-0 pl-4 pt-2 body-2" cols="3" sm="2"
                          >(1) ต้องปรับปรุง :
                        </v-col>
                        <v-col class="pa-0 pr-4" cols="9" sm="10">
                          <v-text-field
                            v-model="item.Indicators[4].indicator_detail"
                            label="รายละเอียด"
                            :rules="[v => !!v || 'โปรดกรอกรายละเอียด']"
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "templateScreen",
  mounted() {
    axios
      .get("https://kpis-backend.herokuapp.com/QuestionAdd/" + this.$route.params.id)
      .then(res => {
        this.data = res.data.questions;
        console.log(this.data);
      })
      .catch(err => console.log(err));
  },
  created() {
    const Temp = this.$store.state.questtionsMock;
    // console.log(Temp);
    this.ObjList = Temp;
  },
  data() {
    return {
      questionList: [],
      ObjList: null,
      valid: false,
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
      data : null,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.questionList = Object.assign({}, this.ObjList);
        console.log(this.questionList);
        
        this.$router.push({ path: "/assign" });
      }
    }
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

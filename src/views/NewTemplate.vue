<template>
  <div id="NewtemplateScreen">
    <v-form ref="form" v-model="valid" lazy-validation>
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
                  v-model="TamplateType"
                  :rules="[v => !!v || 'โปรดเลือกรูปแบบการประเมิณผล']"
                  :items="selectTamplate"
                  label="รูปแบบการประเมิณผล"
                  outlined
                  ref="templateType"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  v-model="InsertTagetToChief"
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
                    v-model="KPIPerformance"
                    label="ผลสัมฤทธิ์ที่คาดหวัง"
                    :rules="[v => !!v || 'โปรดกรอกผลสัมฤทธิ์ที่คาดหวัง']"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="mx-auto pa-0" cols="12" sm="12">
                  <v-text-field
                    v-model="Indicators"
                    label="ตัวชี้วัดผลการปฏิบัติงาน"
                    :rules="[v => !!v || 'โปรดกรอกตัวชี้วัดผลการปฏิบัติงาน']"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="Priority"
                      :rules="[v => !!v || 'โปรดเลือกความสำคัญ']"
                      :items="selectPriority"
                      label="ความสำคัญ"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      v-model="menu2popup1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="StartDate"
                          label="Start Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="StartDate"
                        @input="menu2popup1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      v-model="menu2popup2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="EndDate"
                          label="End Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="EndDate"
                        @input="menu2popup2 = false"
                        color="red lighten-1"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
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
                            v-model="TargetList[0]"
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
                            v-model="TargetList[1]"
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
                            v-model="TargetList[2]"
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
                            v-model="TargetList[3]"
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
                            v-model="TargetList[4]"
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
            <v-btn color="success" class="mr-4 mt-2" @click="submitQuestion"
              >สร้างคำถาม</v-btn
            >
          </v-container>
        </v-card>
      </v-container>
    </v-form>

    <!-- open table result -->
    <template
      v-if="questionList.filter(obj => obj.KPI_Type_id === 1).length > 0"
    >
      <div class="mt-6 subtitle-1 font-weight-bold">
        แบบฟอร์ม เป้าหมายเชิงยุทศาสตร์
      </div>
      <div class="mt-2 subtitle-2 font-weight-bold">
        (เป้าหมายที่สอดคล้องกับเป้าหมายผลการปฏิบัติงานในระดับองค์กร)
      </div>
      <table class="mx-auto mt-4">
        <tr>
          <th rowspan="2" bgcolor="#B0BEC5" class="font-weight-bold caption">
            ผลสัมฤทธิ์หลัก KRAS
          </th>
          <th rowspan="2" bgcolor="#B0BEC5" class="font-weight-bold caption">
            ตัวชี้วัดผล KPIs
          </th>
          <th
            rowspan="2"
            bgcolor="#B0BEC5"
            style="color:red;"
            class="font-weight-bold caption"
          >
            ความสำคัญ
          </th>
          <th bgcolor="#B0BEC5" colspan="5" class="font-weight-bold caption">
            ระดับค่าเป้าหมาย
          </th>
          <th rowspan="2" bgcolor="#B0BEC5" class="font-weight-bold caption">
            สอดคล้องกับเป้าหมายผู่บังคับบัญชาหมายเลข
          </th>
          <th rowspan="2" bgcolor="#B0BEC5" class="font-weight-bold caption">
            action
          </th>
        </tr>
        <tr>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (1) ต้องปรับปรุง
          </td>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (2) ต่ำกว่าที่คาดหวัง
          </td>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (3) บรรลุตามที่คาดหวัง
          </td>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (4) เกินกว่าที่คาดหวัง
          </td>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (5) ดีเด่น
          </td>
        </tr>
        <tr
          v-for="(item, index) in questionList.filter(
            obj => obj.KPI_Type_id === 1
          )"
          :key="index"
        >
          <td style="width:250px;">{{ item.KPI_name }}</td>
          <td style="width:350px;">{{ item.KPI_detail }}</td>
          <td v-if="item.KPI_weight === 3" style="width:100px;">มาก</td>
          <td v-if="item.KPI_weight === 2" style="width:100px;">ปานกลาง</td>
          <td v-if="item.KPI_weight === 1" style="width:100px;">น้อย</td>
          <td style="width:100px;">
            {{ item.Indicators[0].indicator_detail }}
          </td>
          <td style="width:100px;">
            {{ item.Indicators[1].indicator_detail }}
          </td>
          <td style="width:100px;">
            {{ item.Indicators[2].indicator_detail }}
          </td>
          <td style="width:100px;">
            {{ item.Indicators[3].indicator_detail }}
          </td>
          <td style="width:100px;">
            {{ item.Indicators[4].indicator_detail }}
          </td>
          <td style="width:150px;">
            {{ item.InsertTagetToChief }}
          </td>
          <td style="width:150px;">
            <template>
              <v-icon class="mr-2" @click="editItem(item)">
                edit
              </v-icon>
              <v-icon class="mr-2" @click="deleteItem(item)">
                delete
              </v-icon>
            </template>
          </td>
        </tr>
      </table>
    </template>

    <template
      v-if="questionList.filter(obj => obj.KPI_Type_id === 2).length > 0"
    >
      <div class="mt-6 subtitle-1 font-weight-bold">
        แบบฟอร์ม เป้าหมายด้านอื่นๆ
      </div>
      <div class="mt-2 subtitle-2 font-weight-bold">
        (เป้าหมายงานตามภารกิจ หรืองานที่ได้รับมอบหมายพิเศษ)
      </div>
      <table class="mx-auto mt-4">
        <tr>
          <th rowspan="2" bgcolor="#B0BEC5" class="font-weight-bold caption">
            ผลสัมฤทธิ์หลัก KRAS
          </th>
          <th rowspan="2" bgcolor="#B0BEC5" class="font-weight-bold caption">
            ตัวชี้วัดผล KPIs
          </th>
          <th
            rowspan="2"
            bgcolor="#B0BEC5"
            style="color:red;"
            class="font-weight-bold caption"
          >
            ความสำคัญ
          </th>
          <th bgcolor="#B0BEC5" colspan="5" class="font-weight-bold caption">
            ระดับค่าเป้าหมาย
          </th>
          <th rowspan="2" bgcolor="#B0BEC5" class="font-weight-bold caption">
            สอดคล้องกับเป้าหมายผู่บังคับบัญชาหมายเลข
          </th>
          <th rowspan="2" bgcolor="#B0BEC5" class="font-weight-bold caption">
            action
          </th>
        </tr>
        <tr>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (1) ต้องปรับปรุง
          </td>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (2) ต่ำกว่าที่คาดหวัง
          </td>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (3) บรรลุตามที่คาดหวัง
          </td>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (4) เกินกว่าที่คาดหวัง
          </td>
          <td bgcolor="#CFD8DC" class="font-weight-bold caption">
            (5) ดีเด่น
          </td>
        </tr>
        <tr
          v-for="(item, index) in questionList.filter(
            obj => obj.KPI_Type_id === 2
          )"
          :key="index"
        >
          <td style="width:250px;">{{ item.KPI_name }}</td>
          <td style="width:350px;">{{ item.KPI_detail }}</td>
          <td v-if="item.KPI_weight === 3" style="width:100px;">มาก</td>
          <td v-if="item.KPI_weight === 2" style="width:100px;">ปานกลาง</td>
          <td v-if="item.KPI_weight === 1" style="width:100px;">น้อย</td>
          <td style="width:100px;">
            {{ item.Indicators[0].indicator_detail }}
          </td>
          <td style="width:100px;">
            {{ item.Indicators[1].indicator_detail }}
          </td>
          <td style="width:100px;">
            {{ item.Indicators[2].indicator_detail }}
          </td>
          <td style="width:100px;">
            {{ item.Indicators[3].indicator_detail }}
          </td>
          <td style="width:100px;">
            {{ item.Indicators[4].indicator_detail }}
          </td>
          <td style="width:150px;">
            {{ item.InsertTagetToChief }}
          </td>
          <td style="width:150px;">
            <template>
              <v-icon class="mr-2" @click="editItem(item)">
                edit
              </v-icon>
              <v-icon class="mr-2" @click="deleteItem(item)">
                delete
              </v-icon>
            </template>
          </td>
        </tr>
      </table>
    </template>
    <!-- close table result -->

    <!-- open Modal -->
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  filled
                  auto-grow
                  rows="2"
                  v-model="editedItem.kpi_name"
                  label="ผลสัมฤทธิ์ที่คาดหวัง :"
                  row-height="20"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  filled
                  auto-grow
                  v-model="editedItem.kpi_detail"
                  label="ตัวชี้วัดผลการปฏิบัติงาน :"
                  rows="2"
                  row-height="20"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-select
                  :items="selectPriority"
                  label="ความสำคัญ :"
                  v-model="editedItem.kpi_weight"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="12">
                <v-col>ระดับค่าเป้าหมาย : </v-col>
                <v-container>
                  <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Indicators[0].indicator_detail"
                        label="(1) ต้องปรับปรุง"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Indicators[1].indicator_detail"
                        label="(2) ต่ำกว่าที่คาดหวัง"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Indicators[2].indicator_detail"
                        label="(3) บรรลุตามที่คาดหวัง"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Indicators[3].indicator_detail"
                        label="(4) เกินกว่าที่คาดหวัง"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Indicators[4].indicator_detail"
                        label="(5) ดีเด่น"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  filled
                  auto-grow
                  rows="2"
                  v-model="editedItem.InsertTagetToChief"
                  label="สอดกล้องกับเป้าหมายผู้บังคับบัญชา :"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- close Modal -->

    <!-- open Template create-->
    <v-dialog v-model="dialogTemplate" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">โปรดกรอกชื่อ Template</v-card-title>
        <!-- <v-card-text>โปรดกรอกชื่อ Template</v-card-text> -->
        <v-col cols="12" sm="6" md="12">
          <v-text-field
            label="โปรดกรอกชื่อ..."
            v-model="Template_name"
          ></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogTemplate = false"
            >ยกเลิก</v-btn
          >
          <v-btn color="green darken-1" text @click="saveTemplate">สร้าง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- close close Template create -->

    <v-row>
      <v-col cols="10"></v-col>
      <v-col cols="2">
        <v-btn @click="createTemplate" color="primary" class="mr-4 mt-4"
          >สร้าง template</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "templateScreen",
  computed: {
    questionList: {
      get() {
        return this.$store.state.questionList;
      },
      set(value) {
        this.$store.commit("updatequestionList", value);
      }
    },
    TamplateType: {
      get() {
        return this.$store.state.TamplateType;
      },
      set(value) {
        this.$store.commit("updateTamplateType", value);
      }
    },
    Template_name: {
      get() {
        return this.$store.state.Template_name;
      },
      set(value) {
        this.$store.commit("updateTamplateName", value);
      }
    },
    InsertTagetToChief: {
      get() {
        return this.$store.state.InsertTagetToChief;
      },
      set(value) {
        this.$store.commit("updateinsertTagetToChief", value);
      }
    },
    KPIPerformance: {
      get() {
        return this.$store.state.KPIPerformance;
      },
      set(value) {
        this.$store.commit("updateKPIPerformance", value);
      }
    },
    Indicators: {
      get() {
        return this.$store.state.Indicators;
      },
      set(value) {
        this.$store.commit("updateIndicators", value);
      }
    },
    Priority: {
      get() {
        return this.$store.state.Priority;
      },
      set(value) {
        this.$store.commit("updatePriority", value);
      }
    },
    TargetList: {
      get() {
        return this.$store.state.TargetList;
      },
      set(value) {
        this.$store.commit("updateTargetList", value);
      }
    },
    StartDate: {
      get() {
        return this.$store.state.StartDate;
      },
      set(value) {
        this.$store.commit("updateStartDate", value);
      }
    },
    EndDate: {
      get() {
        return this.$store.state.EndDate;
      },
      set(value) {
        this.$store.commit("updateEndDate", value);
      }
    },
    Templates: {
      get() {
        return this.$store.state.Templates;
      },
      set(value) {
        this.$store.commit("updateTemplate", value);
      }
    }
  },
  data() {
    return {
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
          text: "สอดคล้องกับทางผู้บริหาร"
        },
        {
          text: "สอดคล้องกับเป้าหมายบุคคล"
        },
        {
          text: "สอดคล้องเบื้องต้น"
        }
      ],
      valid: false,
      dialog: false,
      dialogTemplate: false,
      editedIndex: -1,
      editedItem: {
        kpi_name: null,
        kpi_detail: null,
        kpi_weight: null,
        Indicators: [
          {
            kpi_id: null,
            indicator_lv: 1,
            indicator_detail: null
          },
          {
            kpi_id: null,
            indicator_lv: 2,
            indicator_detail: null
          },
          {
            kpi_id: null,
            indicator_lv: 3,
            indicator_detail: null
          },
          {
            kpi_id: null,
            indicator_lv: 4,
            indicator_detail: null
          },
          {
            kpi_id: null,
            indicator_lv: 5,
            indicator_detail: null
          }
        ],
        InsertTagetToChief: null,
        start_date: null,
        end_date: null
      },
      defaultItem: {
        kpi_name: null,
        kpi_detail: null,
        kpi_weight: null,
        Indicators: [
          {
            kpi_id: null,
            indicator_lv: 1,
            indicator_detail: null
          },
          {
            kpi_id: null,
            indicator_lv: 2,
            indicator_detail: null
          },
          {
            kpi_id: null,
            indicator_lv: 3,
            indicator_detail: null
          },
          {
            kpi_id: null,
            indicator_lv: 4,
            indicator_detail: null
          },
          {
            kpi_id: null,
            indicator_lv: 5,
            indicator_detail: null
          }
        ],
        InsertTagetToChief: null,
        start_date: null,
        end_date: null
      },
      EmptyTemplate: {},
      //   date: new Date().toISOString().substr(0, 10),
      menupopup1: false,
      menupopup2: false
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
      this.$refs.form.reset();
    }
  },
  methods: {
    submitQuestion() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$store.state.questionList.push({
          Template_id: 1,
          KPI_id: 123,
          KPI_Type_id: this.TamplateType,
          KPI_name: this.KPIPerformance,
          KPI_detail: this.Indicators,
          KPI_weight: this.Priority,
          Indicators: [
            {
              KPI_id: 123,
              indicator_lv: 1,
              indicator_detail: this.TargetList[0]
            },
            {
              KPI_id: 123,
              indicator_lv: 2,
              indicator_detail: this.TargetList[1]
            },
            {
              KPI_id: 123,
              indicator_lv: 3,
              indicator_detail: this.TargetList[2]
            },
            {
              KPI_id: 123,
              indicator_lv: 4,
              indicator_detail: this.TargetList[3]
            },
            {
              KPI_id: 123,
              indicator_lv: 5,
              indicator_detail: this.TargetList[4]
            }
          ],
          InsertTagetToChief: this.InsertTagetToChief,
          start_date: this.StartDate,
          end_date: this.EndDate
        });
        console.log(this.$store.state.questionList);
        // RESET VALAE IN STORE
        this.$store.dispatch("resetTamplateType");
        this.$store.dispatch("resetKPIPerformance");
        this.$store.dispatch("resetInsertTagetToChief");
        this.$store.dispatch("resetIndicators");
        this.$store.dispatch("resetPriority");
        this.$store.dispatch("resetTargetList");
        this.$store.dispatch("resetStartDate");
        this.$store.dispatch("resetEndDate");

        // RESET FORM
        this.$refs.form.resetValidation();
      }
    },
    editItem(item) {
      console.log(item);
      this.editedIndex = this.questionList.indexOf(item);
      // console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      // console.log(this.editedIndex);
      // console.log(this.editedItem);
    },
    deleteItem(item) {
      const index = this.questionList.indexOf(item);
      console.log(index);
      console.log(item);
      confirm("คุณแน่ใจนะว่าจะลบ คำถามนี้ ?") &&
        this.questionList.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        // เอา objs[] ที่เราคลิ๊กเป็นตัวตั้ง แล้วเอา ค่าที่ edit ไปเทียบแล้วอัปเดตตาม ตาม parameter ที่ 2
        Object.assign(this.questionList[this.editedIndex], this.editedItem);
        console.log(this.questionList[this.editedIndex]);
      } else {
        this.questionList.push(this.editedItem);
      }
      this.close();
    },
    createTemplate() {
      if (this.questionList.length > 0) {
        this.dialogTemplate = true;
        // console.log(this.questionList);
      } else {
        alert("โปรดสร้างคำถามก่อน !!!!");
      }
    },
    saveTemplate() {
      const source = {
        Template_id: 1,
        Template_name: this.Template_name,
        questions: this.questionList
      };

      this.EmptyTemplate = Object.assign({}, source);
      // console.log(this.EmptyTemplate);
      this.$store.dispatch("resetTemplateName");

      axios
        .post(
          "https://kpis-backend.herokuapp.com/QuestionAdd/newQuestion/",
          this.EmptyTemplate
        )
        .then(res => {
          if (res.data) {
            Swal.fire({
              icon: "success",
              title: "Create Template",
              showConfirmButton: false,
              timer: 1000
            });
            console.log(res.data);
            setTimeout(() => this.$refs.templateType.focus(), 1500);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!"
            });
          }
        })
        .catch(error => console.log(error));
      this.dialogTemplate = false;
      // console.log(this.Templates);
      this.$store.dispatch("resetQuestionEmpty");
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

<template>
  <div>
    <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
      <template v-if="objs.filter(obj => obj.TemplateType === 1).length > 0">
        <div class="mt-6 subtitle-1 font-weight-bold">
          แบบฟอร์ม เป้าหมายเชิงยุทศาสตร์
        </div>
        <div class="mt-2 subtitle-2 font-weight-bold">
          (เป้าหมายที่สอดคล้องกับเป้าหมายผลการปฏิบัติงานในระดับองค์กร)
        </div>
        <table class="mx-auto mt-4">
          <tr>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
              ผลสัมฤทธิ์ที่คาดหวัง
            </th>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
              ตัวชี้วัดผลการปฏิบัติงาน
            </th>
            <th
              rowspan="2"
              bgcolor="#CFD8DC"
              style="color:red;"
              class="font-weight-bold caption"
            >
              ความสำคัญ
            </th>
            <th bgcolor="#CFD8DC" colspan="5" class="font-weight-bold caption">
              ระดับค่าเป้าหมาย
            </th>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
              ผลการปฏิบัติงาน
            </th>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
              Remark
            </th>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
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
            v-for="(item, index) in objs.filter(obj => obj.TemplateType === 1)"
            :key="index"
          >
            <td style="width:250px;">{{ item.KPIPerformance }}</td>
            <td style="width:350px;">{{ item.indicators }}</td>
            <td
              style="width:100px;"
              v-if="item.priority === 3"
              class="font-weight-bold"
            >
              สำคัญมาก
            </td>
            <td
              style="width:100px;"
              v-else-if="item.priority === 2"
              class="font-weight-bold"
            >
              สำคัญปานกลาง
            </td>
            <td
              style="width:100px;"
              v-else-if="item.priority === 1"
              class="font-weight-bold"
            >
              สำคัญน้อย
            </td>
            <!-- ระดับค่าเป้าหมาย  -->
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[0] }}
            </td>
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[1] }}
            </td>
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[2] }}
            </td>
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[3] }}
            </td>
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[4] }}
            </td>
            <!-- ระดับค่าเป้าหมาย  -->
            <td>
              <v-select
                style="width:150px;"
                v-model="item.answer"
                :items="AnswerItems"
                label="กรอกผลการปฎิบัติงาน"
                :rules="[v => !!v || 'Item is required']"
                required
              ></v-select>
            </td>
            <td style="width:350px;">
              <!-- <v-text-field
                v-model="item.RemarkAnswer"
              ></v-text-field> -->
              <v-textarea
                class="mt-2"
                style="font-size:13px; font-family: 'Kanit', sans-serif;"
                outlined
                rows="4"
                v-model="item.RemarkAnswer"
              ></v-textarea>
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

      <template v-if="objs.filter(obj => obj.TemplateType === 2).length > 0">
        <div class="mt-6 subtitle-1 font-weight-bold">
          แบบฟอร์ม เป้าหมายงานด้านอื่นๆ
        </div>
        <div class="mt-2 subtitle-2 font-weight-bold">
          (เป้าหมายงานตามภารกิจ หรืองานทีได้รับมอบหมายพิเศษ)
        </div>
        <table class="mx-auto mt-4">
          <tr>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
              ผลสัมฤทธิ์ที่คาดหวัง
            </th>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
              ตัวชี้วัดผลการปฏิบัติงาน
            </th>
            <th
              rowspan="2"
              bgcolor="#CFD8DC"
              style="color:red;"
              class="font-weight-bold caption"
            >
              ความสำคัญ
            </th>
            <th bgcolor="#CFD8DC" colspan="5" class="font-weight-bold caption">
              ระดับค่าเป้าหมาย
            </th>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
              ผลการปฏิบัติงาน
            </th>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
              Remark
            </th>
            <th rowspan="2" bgcolor="#CFD8DC" class="font-weight-bold caption">
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
            v-for="(item, index) in objs.filter(obj => obj.TemplateType === 2)"
            :key="index"
          >
            <td style="width:250px;">{{ item.KPIPerformance }}</td>
            <td style="width:350px;">{{ item.indicators }}</td>
            <td
              style="width:100px;"
              v-if="item.priority === 3"
              class="font-weight-bold"
            >
              สำคัญมาก
            </td>
            <td
              style="width:100px;"
              v-else-if="item.priority === 2"
              class="font-weight-bold"
            >
              สำคัญปานกลาง
            </td>
            <td
              style="width:100px;"
              v-else-if="item.priority === 1"
              class="font-weight-bold"
            >
              สำคัญน้อย
            </td>
            <!-- ระดับค่าเป้าหมาย  -->
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[0] }}
            </td>
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[1] }}
            </td>
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[2] }}
            </td>
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[3] }}
            </td>
            <td style="width:100px;" class="font-weight-bold">
              {{ item.targetList[4] }}
            </td>
            <!-- ระดับค่าเป้าหมาย  -->
            <td>
              <v-select
                style="width:150px;"
                v-model="item.answer"
                :items="AnswerItems"
                label="กรอกผลการปฎิบัติงาน"
                :rules="[v => !!v || 'Item is required']"
                required
              ></v-select>
            </td>
            <td style="width:350px;">
              <!-- <v-text-field v-model="item.RemarkAnswer">

              </v-text-field> -->
              <v-textarea
                class="mt-2"
                style="font-size:13px; font-family: 'Kanit', sans-serif;"
                outlined
                rows="4"
                v-model="item.RemarkAnswer"
              ></v-textarea>
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
      <v-btn color="success" class="mr-4 mt-2" @click="sum1">ยืนยัน</v-btn>

      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="4">
          <div class="red white--text">ผลรวมคะแนน : {{ totalsum }}</div>
          <div class="blue white--text">KPI : {{ KPItotal }}</div>
          <div class="yellow">ร้อยละ : {{ Percentage }}</div>
        </v-col>
      </v-row>
      
      <!-- open show dialog -->
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    v-model="editedItem.KPIPerformance"
                    label="ผลสัมฤทธิ์ที่คาดหวัง"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    v-model="editedItem.indicators"
                    label="ตัวชี้วัดผลการปฏิบัติงาน"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="selectPriority"
                    label="ความสำคัญ"
                    v-model="editedItem.priority"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="AnswerItems"
                    label="ผลการปฏิบัติงาน"
                    v-model="editedItem.answer"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="12">
                  <v-col>ระดับค่าเป้าหมาย : </v-col>
                  <v-container>
                    <v-row align="center">
                      <v-col class="d-flex" cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.targetList[0]"
                          label="(1) ต้องปรับปรุง"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.targetList[1]"
                          label="(2) ต่ำกว่าที่คาดหวัง"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.targetList[2]"
                          label="(3) บรรลุตามที่คาดหวัง"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.targetList[3]"
                          label="(4) เกินกว่าที่คาดหวัง"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.targetList[4]"
                          label="(5) ดีเด่น"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-textarea
                    solo
                    v-model="editedItem.insertTagetToChief"
                    label="สอดกล้องกับเป้าหมายผู้บังคับบัญชา"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- close show dialog -->

    </v-form>
  </div>
</template>

<script>

export default {
  name: "assessment",
  data() {
    return {
      valid: true,
      newObject: [],
      editedIndex: -1,
      editedItem: {
        questionId: 0,
        TemplateType: 0,
        KPIPerformance: "",
        indicators: "",
        priority: 0,
        targetList: [],
        insertTagetToChief: "",
        answer: null
      },
      defaultItem: {
        questionId: 0,
        TemplateType: 0,
        KPIPerformance: "",
        indicators: "",
        priority: 0,
        targetList: [],
        insertTagetToChief: "",
        answer: null
      },
      objs: [
        {
          questionId: 12,
          TemplateType: 1,
          KPIPerformance: "ความรู้ ทักษะทางเทคนิคและการพัฒนาศักยภาพของตนเอง",
          indicators:
            "พิจารณาความรู้และประสบการณ์ด้านวิชาการ ทฤษฎีที่เกี่ยวข้องในตำแหน่งมาประยุกต์ใช้กับหน้าที่ความรับผิดชอบ",
          priority: 3,
          targetList: ["ยอดเยี่ยม", "ดีมาก", "ปานกลาง", "น้อย", "น้อยมาก"],
          insertTagetToChief: "201",
          answer: null,
          RemarkAnswer: null
        },
        {
          questionId: 21,
          TemplateType: 2,
          KPIPerformance: "ความคิดริเริ่ม",
          indicators: `พิจารณากับความสามารถในการดำเนินการด้วยตนเองรู้จักหาทางปรับปรุงแก้ไข `,
          priority: 2,
          targetList: ["ยอดเยี่ยม", "ดีมาก", "ปานกลาง", "น้อย", "น้อยมาก"],
          insertTagetToChief: "223",
          answer: null,
          RemarkAnswer: null
        },
        {
          questionId: 31,
          TemplateType: 2,
          KPIPerformance: `ความรับผิดชอบ และความอุตสาหะ`,
          indicators: `ความสนใจตั้งใจปฎิบัติหน้าที่ด้วยความเพียรพยายาม ละเอียดรอบคอบ`,
          priority: 2,
          targetList: ["ยอดเยี่ยม", "ดีมาก", "ปานกลาง", "น้อย", "น้อยมาก"],
          insertTagetToChief: "test to head  xaca",
          answer: null,
          RemarkAnswer: null
        },
        {
          questionId: 34,
          TemplateType: 2,
          KPIPerformance: "ทัศนคติที่ดีต่อคน",
          indicators: `พิจารณาแนวคิดและท่าทีโดยรวมในเชิงบวกของพนักงานต่อผู้บังคับบัญชา `,
          priority: 1,
          targetList: ["ยอดเยี่ยม", "ดีมาก", "ปานกลาง", "น้อย", "น้อยมาก"],
          insertTagetToChief: "test to head asdasw",
          answer: null,
          RemarkAnswer: null
        }
      ],
      AnswerItems: [5, 4, 3, 2, 1],
      RemarkAnswer: "",
      // select: null,
      KPItotal: "",
      Percentage: "",
      totalsum: 0,
      tagetsum: 0,
      Multipliers: 5,
      dialog: false,
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
      ]
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    submit() {
      //   this.$v.$touch();
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.newObject = this.objs.map(value => {
          return {
            questionId: value.questionId,
            answer: value.answer,

            // เพิ่ม
            priority: value.priority
          };
        });
        console.log(this.newObject);
      }
    },
    sum1() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.newObject = this.objs.map(value => {
          return {
            questionId: value.questionId,
            answer: value.answer,

            // เพิ่ม
            priority: value.priority,
            sumAnswer: value.answer * value.priority,
            RemarkAnswer: value.RemarkAnswer
          };
        });
        console.log(this.newObject);
        this.tagetsum = this.newObject.map(value => value.priority);
        this.tagetsum = this.tagetsum.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
        console.log("เป้าหมาย " + this.tagetsum);

        this.totalsum = this.newObject.map(value => value.sumAnswer);
        this.totalsum = this.totalsum.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
        console.log("ผลรวมคะแนน " + this.totalsum);

        this.KPItotal = this.totalsum / (this.Multipliers * this.tagetsum);
        this.Percentage = this.KPItotal * 100;
      }
    },
    editItem(item) {
      this.editedIndex = this.objs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(this.editedIndex);
      console.log(this.editedItem);
    },
    deleteItem(item) {
      const index = this.objs.indexOf(item);
      console.log(index);
      console.log(item);
      confirm("คุณแน่ใจนะว่าจะลบ คำถามนี้ ?") && this.objs.splice(index, 1);
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
        Object.assign(this.objs[this.editedIndex], this.editedItem);
        console.log(this.objs[this.editedIndex]);
        console.log(this.objs);
      } else {
        this.newObject.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}

td,
th {
  border: 0.1px solid #455a64;
  text-align: left;
  padding: 8px;
  text-align: center;
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Templates: {},
        questionList: [],
        Template_name: null,
        TamplateType: null,
        KPIPerformance: null,
        Indicators: null,
        Priority: null,
        TargetList: [],
        InsertTagetToChief: null,
        StartDate: null,
        EndDate: null,
        Mockup: [{
                Template_id: 12,
                Template_name: "name1",
                questtions: [{
                    kpi_type_id: 1,
                    kpi_id: "123",
                    kpi_names: "kpi_name2",
                    kpi_detail: "รายละเอียด",
                    start_date: "12/02/2019",
                    end_date: "03/01/2020",
                    Template_id: 12,
                    Indicators: [{
                            kpi_id: "123",
                            indicator_lv: 5,
                            indicator_detail: "ยอดเยี่ยม"
                        },
                        {
                            kpi_id: "123",
                            indicator_lv: 4,
                            indicator_detail: "ดี"
                        }
                    ],
                    insertTagetToChief: "AAA"
                }]
            },
            {
                Template_id: 42,
                Template_name: "name2",
                questtions: [{
                    kpi_type_id: 2,
                    kpi_id: "124",
                    kpi_names: "kpi_name2",
                    kpi_detail: "รายละเอียด",
                    start_date: "12/02/2019",
                    end_date: "03/01/2020",
                    Template_id: 42,
                    Indicators: [{
                            kpi_id: "124",
                            indicator_lv: 5,
                            indicator_detail: "ยอดเยี่ยม"
                        },
                        {
                            kpi_id: "124",
                            indicator_lv: 4,
                            indicator_detail: "ดี"
                        }
                    ],
                    insertTagetToChief: "BBB"
                }]
            }
        ],
        questtionsMock: {
            kpi_type_id: 1,
            kpi_id: "123",
            kpi_names: "kpi_name2",
            kpi_detail: "รายละเอียด",
            kpi_weight: 2,
            start_date: "12/02/2019",
            end_date: "03/01/2020",
            Template_id: 12,
            Indicators: [{
                    kpi_id: "123",
                    indicator_lv: 5,
                    indicator_detail: "ยอดเยี่ยม"
                },
                {
                    kpi_id: "123",
                    indicator_lv: 4,
                    indicator_detail: "ดี"
                },
                {
                    kpi_id: "123",
                    indicator_lv: 3,
                    indicator_detail: "ปานกลาง"
                },
                {
                    kpi_id: "123",
                    indicator_lv: 2,
                    indicator_detail: "น้อย"
                },
                {
                    kpi_id: "123",
                    indicator_lv: 1,
                    indicator_detail: "น้อยมาก"
                },
            ],
            insertTagetToChief: 2
        }
    },
    getters: {},
    actions: {
        resetTamplateType({ commit }) {
            commit('SetTamplateType');
        },
        resetQuestionEmpty({ commit }) {
            commit('SetQuestionEmpty');
        },
        resetKPIPerformance({ commit }) {
            commit('SetKPIPerformance');
        },
        resetInsertTagetToChief({ commit }) {
            commit('SetInsertTagetToChief');
        },
        resetIndicators({ commit }) {
            commit('SetIndicators');
        },
        resetPriority({ commit }) {
            commit('SetPriority');
        },
        resetTargetList({ commit }) {
            commit('SetTargetList');
        },
        resetStartDate({ commit }) {
            commit('SetStartDate');
        },
        resetEndDate({ commit }) {
            commit('SetEndDate');
        },
        resetTemplateName({ commit }) {
            commit('SetTemplateName')
        }

    },
    mutations: {
        updateTemplate(state, value) {
            state.Templates = value
        },
        updatequestionList(state, value) {
            state.TamplateType = value;
        },
        updateTamplateName(state, value) {
            state.Template_name = value
        },
        updateTamplateType(state, value) {
            state.TamplateType = value;
        },
        updateKPIPerformance(state, value) {
            state.KPIPerformance = value
        },
        updateIndicators(state, value) {
            state.Indicators = value
        },
        updatePriority(state, value) {
            state.Priority = value
        },
        updateTargetList(state, value) {
            state.TargetList = value
        },
        updateinsertTagetToChief(state, value) {
            state.InsertTagetToChief = value
        },
        updateStartDate(state, value) {
            state.StartDate = value;
        },
        updateEndDate(state, value) {
            state.EndDate = value
        },
        SetQuestionEmpty(state) {
            state.questionList = []
        },
        SetTamplateType(state) {
            state.TamplateType = null
        },
        SetKPIPerformance(state) {
            state.KPIPerformance = null
        },
        SetInsertTagetToChief(state) {
            state.InsertTagetToChief = null
        },
        SetIndicators(state) {
            state.Indicators = null
        },
        SetPriority(state) {
            state.Priority = null
        },
        SetTargetList(state) {
            state.TargetList = []
        },
        SetStartDate(state) {
            state.StartDate = null
        },
        SetEndDate(state) {
            state.EndDate = null
        },
        SetTemplateName(state) {
            state.Template_name = null
        }
    },
    modules: {}
})
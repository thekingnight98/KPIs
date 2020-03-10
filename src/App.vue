<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer disable-resize-watcher v-model="drawer" app>
      <v-sheet height="400" class="overflow-hidden" style="position: relative;">
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/78.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item
              :to="item.link"
              v-for="item in items"
              :key="item.title"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>
    </v-navigation-drawer>

    <v-app-bar app color="blue-grey lighten-2 accent-2" dark>
      <!-- <v-btn color="pink" dark @click.stop="drawer = !drawer">
        Toggle
      </v-btn> -->
      <v-icon large left @click.stop="drawer = !drawer">
        reorder
      </v-icon>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        /> -->
        <div class="headline">
          KPIS
        </div>
      </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      items: [
        { title: "สร้างเป้าหมาย", icon: "home", link: "/newTemplate" },
        { title: "ASSIGN", icon: "assignment_ind", link: "/assign" },
        { title: "ประเมิณผล", icon: "assessment", link: "/assessment" },
      ],
      sidebar: false,
      drawer: false,
    };
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>

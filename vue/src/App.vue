<template>
  <div id="app">
    <section class="sidebar">
      <b-sidebar
        type="is-white"
        position="static"
        mobile="reduce"
        :fullheight="true"
        :open="true"
        :can-cancel="false"
      >
        <div>
          <div class="logo">
            <img src="@/assets/listmonk.svg"/>
            <p class="is-size-7 has-text-grey">v0.6.2-alpha</p>
          </div>
          <b-menu>
            <b-menu-list>
              <b-menu-item icon="view-dashboard-variant-outline" label="Dashboard"></b-menu-item>

              <b-menu-item icon="format-list-bulleted-square" label="Lists">
                <b-menu-item :to="{name: 'lists'}" tag="router-link"
                  icon="format-list-bulleted-square" label="All lists"></b-menu-item>
                <b-menu-item :to="{name: 'forms'}" tag="router-link"
                  icon="newspaper-variant-outline" label="Forms"></b-menu-item>
              </b-menu-item>

              <b-menu-item icon="account-multiple" label="Subscribers">
                <b-menu-item :to="{name: 'subscribers'}" tag="router-link"
                  icon="account-multiple" label="All subscribers"></b-menu-item>
                <b-menu-item icon="file-upload-outline" label="Import"></b-menu-item>
              </b-menu-item>

              <b-menu-item icon="rocket-launch-outline" label="Campaigns">
                <b-menu-item icon="rocket-launch-outline" label="All campaigns"></b-menu-item>
                <b-menu-item icon="plus" label="Create new"></b-menu-item>
                <b-menu-item icon="image-outline" label="Media"></b-menu-item>
                <b-menu-item icon="file-image-outline" label="Templates"></b-menu-item>
              </b-menu-item>

              <b-menu-item icon="cog-outline" label="Settings"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
    <!-- sidebar-->

    <!-- body //-->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  mounted() {
    // Lists is required across different views. On app load, fetch the lists
    // and have them in the store.
    this.$api.getLists();
  },
});
</script>

<style lang="scss">
  @import "assets/style.scss";
</style>

<template>
<div>
  <div v-on:click="toggleMenu" id="mobile-button">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div id="menu">
    <div class="md-layout md-gutter md-alignment-center-space-around">
      <div id="menu-items">
        <md-menu class="menu-item">
          <md-button class="md-icon-button">
            <md-icon>home</md-icon>
          </md-button>
        </md-menu>

        <md-menu class="menu-item">
          <md-button md-menu-trigger>About us</md-button>
        </md-menu>

        <md-menu class="menu-item">
          <md-button md-menu-trigger>About the Project</md-button>
        </md-menu>

        <md-menu class="menu-item">
          <md-button md-menu-trigger>Dictionary</md-button>
        </md-menu>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      let menu = document.getElementById('menu-items');
      if (menu.style.display === "flex") {
        menu.style.display = "none";
      } else {
        menu.style.display = "flex";
      }
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 600) {
        document.getElementById('mobile-button').style.display = "none";
        document.getElementById('menu-items').style.display = "flex";
      }
      if (this.windowWidth < 600) {
        document.getElementById('mobile-button').style.display = "block";
        document.getElementById('menu-items').style.display = "none";
      }
    })
  },

}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";
@import url("https://fonts.googleapis.com/css?family=Material+Icons");

.md-layout {
    padding: 5px;
}

#mobile-button {
    margin-top: 15px;
    display: none;
}

#mobile-button div {
    width: 35px;
    height: 5px;
    background-color: white;
    margin: 6px 0;
}

#mobile-button:hover {
    cursor: pointer;
}

@media only screen and (max-width: 600px) {

    #mobile-button {
        display: block;
    }

    #menu-items {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: center;
    }

    #menu-items {
        display: none;
        padding: 5px;
    }

    #menu {
        margin-bottom: 25px;
    }

    .menu-item {
        width: 100%;
        border-bottom: 1px solid white !important;
    }
}
</style>

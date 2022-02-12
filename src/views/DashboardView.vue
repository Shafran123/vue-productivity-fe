<script
 lang="js">
  import { ref } from 'vue'
  import SideNavHeading from "@/components/SideNavHeading.vue";
  import SideNavLinks from "@/components/SideNavLinks.vue";
  import { UserGroupIcon , UserIcon  , ClipboardListIcon , MenuIcon , XIcon} from '@heroicons/vue/outline';

export default {

    components: {
  SideNavLinks,
  SideNavHeading,
      UserGroupIcon,
      UserIcon,
      ClipboardListIcon, 
      MenuIcon,
      XIcon,
    },
    setup() {
          let open_mobile_nav = ref(false)


      return {
      
         open_mobile_nav
      }
    }, 
      methods: {
      onClickMenuIcon() {
        console.log('On Click.')
        this.open_mobile_nav = !this.open_mobile_nav
      },
      onClickMobileNav() {
        console.log('On Click Mobile Nav')
        this.open_mobile_nav = false
      },
    },
  }
</script>

<template>
  <div className="min-h-screen flex flex-col">
    <div className="flex flex-col md:flex-row flex-1">
      <aside
        className="bg-white  w-full md:w-[260px]  xxs:hidden md:flex border-r-[1px] border-[#EAEAEA] shadow-md p-6"
      >
        <div class="w-full">
          <side-nav-heading></side-nav-heading>

          <div class="h-10"></div>

          <div class="w-full">
            <side-nav-links></side-nav-links>
          </div>
        </div>
      </aside>
      <main className="flex-1  bg-[#FBFBFB]">
        <div
          class="
            bg-white
            w-[100%]
            h-14
            flex
            justify-between
            pl-6
            pr-6
            md:pl-10 md:pr-10
            items-center
            md:justify-end
          "
        >
          <button @click="onClickMenuIcon" class="md:hidden">

            <MenuIcon  v-if="!open_mobile_nav" class="h-6" />

            <XIcon  v-if="open_mobile_nav" class="h-6"/>
          </button>
          <div>Hello User</div>
        </div>

        <div class="bg-[#FBFBFB] md:p-10 w-[100%]">


           <div v-if="open_mobile_nav" class="absolute top-14 w-full h-screen left-0 z-40   h-10 bg-gray-200 p-6">
            <SideNavLinks @click="onClickMobileNav" />
          </div>
       
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

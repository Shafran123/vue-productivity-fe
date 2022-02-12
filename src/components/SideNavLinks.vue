<script  lang="js">
  import { UserGroupIcon , UserIcon  , ClipboardListIcon} from '@heroicons/vue/outline'
  export default {

    components: {
  
      UserGroupIcon,
      UserIcon,
      ClipboardListIcon
    },
  }
</script>

<template>
  <ul>
    <!-- <router-link
      to="/dashboard"
      exact-active-class="sideNavItemSelected"
      class="sideNavItem"
      :v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
      <li>
        <div>Dashboard</div>
      </li>
    </router-link> -->

    <router-link
      to="/dashboard/teams"
      active-class="sideNavItemSelected"
      class="sideNavItem"
      :v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
      <li class="flex items-center">
        <div >
    <UserGroupIcon class="h-5" />
        </div>
    
        <div class="pl-2">Teams</div>
      </li>
    </router-link>

    <router-link
      to="/dashboard/employees"
      active-class="sideNavItemSelected"
      class="sideNavItem"
      :v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
     <li class="flex items-center">
        <div >
    <UserIcon class="h-5" />
        </div>
    
        <div class="pl-2">Employees</div>
      </li>
      
    </router-link>


    <router-link
      to="/dashboard/tasks"
      active-class="sideNavItemSelected"
      class="sideNavItem"
      :v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
     <li class="flex items-center">
        <div >
    <ClipboardListIcon class="h-5" />
        </div>
    
        <div class="pl-2">Tasks</div>
      </li>

    </router-link>

  </ul>
</template>

<style scoped>
.sideNavItem {
  @apply flex items-center pl-4 text-[#3C3C3C]  mb-4 h-12 rounded-sm;
}

.sideNavItemSelected {
  @apply flex items-center pl-4 text-[#3C3C3C] mb-4 text-white h-12 bg-cyan-500 w-full rounded-md;
}
</style>

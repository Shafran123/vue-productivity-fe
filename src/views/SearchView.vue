<script lang="js">

 import axios_i from '../services/axiosinstance'
 import Task from '@/components/Task.vue'

 export default {
    components: {
      Task
    },
      data() {
      return {
        searchText: '',
        debounce: null,
        tasks: [],
      }
    },
     methods: {
        debounceSearch(event){
          this.debounce = setTimeout(() => {
              console.log(event);
              this.searchText = event.target.value
              this.getTasks()
          }, 600)
        },

        getTasks(){
          axios_i.get(`task/search-task?q=${this.searchText}`).then(res => {
            console.log(res.data.data)
            this.tasks = res.data.data
          }).catch(err => {
              console.log(err)
          })
        }
    },
 }
</script>

<template>
  <div class="mainContainer">
    <div class="pageHeadingComponent">
      <h1 class="pageHeadingH1">🔍 Search</h1>

    </div>

    <div class="spacer10"></div>

    <input  @input="debounceSearch" class="mb-2 pl-4 w-full bg-white h-14 rounded-md shadow-md"  placeholder="Search Tasks By Task Code , Task Name , Project , Status "/>

    <div>
       <div v-for="index in tasks" :key="index">
            <Task class="mb-5 w-full" v-bind:data="index"  @taskComponentClick="onClickTask(index)" />
          </div>
    </div>


  </div>
</template>

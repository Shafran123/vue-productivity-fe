<script lang="js">
  
  import { ref } from 'vue'
  import { reactive } from 'vue'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
  import TaskUploadForm from '@/components/TaskUploadForm.vue'
  import axios_i from '../services/axiosinstance'
  import Task from '@/components/Task.vue'
  import TaskDetail from '@/components/TaskDetail.vue'


  export default {
    components: {
      TaskUploadForm,
      Task,
      TaskDetail
    },
      mounted() {
      console.log('Component mounted getAllTasks.')
      this.getAllTasks()
    },
    data() {
      return {
        selectedTask: '',
        loading: true,
        backlog:[],
        in_progress:[],
        completed: []
      }
    },
    setup() {
      let open_modal = ref(false);
            let open_task_modal = ref(false);
      const open = ref(true)

      return {
        open,
        open_modal,
        open_task_modal
      }
    },
    methods: {
      getAllTasks(){
           axios_i.get('task/get-all-tasks').then(res => {
            console.log(res.data.data)
            this.backlog = res.data.data.backlog_tasks,
            this.in_progress = res.data.data.inprogress_tasks,
            this.completed = res.data.data.completed_tasks
            this.loading = false
          }).catch(err => {
          
          })
      },

      uploadTask() {
        console.log('On Click uploadTask')
         this.open_modal = !this.open_modal
      },

      onClickCloseModal(){
         this.open_modal = false
      },
      upload(file){
          console.log('uploadTask' , file)
          const formData = new FormData();
          formData.append("file", file);
         axios_i.post('task/upload-task', formData).then(res => {
            console.log(res)
               this.getAllTasks()
              this.open_modal = false
            
          }).catch(err => {
          
          })
      },

      onClickTask(task){
          this.selectedTask = task
          this.open_task_modal = true
          console.log('Task Clicked' , task)
          
      },
      onClickCloseTaskModal(){
        console.log('Task Close')
        this.open_task_modal = false
      },
    },
  }

</script>

<style scoped>
.taskMainContainer {
  @apply pb-4 w-full overflow-scroll;
}

.taskScrollView {
  @apply flex flex-wrap flex-col content-start justify-center  items-baseline   h-32  pl-2 overflow-scroll;
}
</style>

<template>
  <div class="mainContainer">
    <div class="pageHeadingComponent">
      <h1 class="pageHeadingH1">⚒️ Tasks</h1>

      <button class="pageHeadingButton" @click="uploadTask">
        Upload Tasks
      </button>
    </div>

    <div class="spacer10"></div>

    <div v-if="this.loading">
      <div class="flex justify-center items-center">
        <div
          class="
            spinner-border
            animate-spin
            inline-block
            w-8
            h-8
            border-4
            rounded-full
          "
          role="status"
        >
        </div>
      </div>
    </div>

    <div v-if="!this.loading">
      <div class="taskMainContainer">
        <div class="text-xl font-medium pb-4">🤯 Backlog</div>
        <div class="taskScrollView">
          <div v-for="index in backlog" :key="index">
            <task v-bind:data="index"  @taskComponentClick="onClickTask(index)" ></task>
          </div>
        </div>
      </div>

      <div class="taskMainContainer">
        <div class="text-xl font-medium pb-4">⛏️ In Progress</div>
        <div class="taskScrollView">
          <div v-for="index in in_progress" :key="index">
            <task v-bind:data="index" @taskComponentClick="onClickTask(index)"></task>
          </div>
        </div>
      </div>

      <div class="taskMainContainer">
        <div class="text-xl font-medium pb-4">✅ Completed</div>
        <div class="taskScrollView">
          <div v-for="index in completed" :key="index">
            <task v-bind:data="index"   @taskComponentClick="onClickTask(index)"></task>
          </div>
        </div>
      </div>
    </div>

    <TaskUploadForm
      v-bind:modal="open_modal"
      @closeModal="onClickCloseModal()"
      @uploadTask="upload"
    />

    <TaskDetail  v-bind:modal="open_task_modal" v-bind:data="selectedTask" @closeModal="onClickCloseTaskModal()" />
  </div>
</template>

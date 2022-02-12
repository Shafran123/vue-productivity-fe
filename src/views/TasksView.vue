<script lang="js">
  
  import { ref } from 'vue'
  import { reactive } from 'vue'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
  import TaskUploadForm from '@/components/TaskUploadForm.vue'
  
  export default {
        components: {
      TaskUploadForm
    },
    setup() {
      let open_modal = ref(false);
      const open = ref(true)

      return {
        open,
        open_modal
      }
    },
    methods: {
      uploadTask() {
        console.log('On Click uploadTask')
         this.open_modal = !this.open_modal
      },

      onClickCloseModal(){
         this.open_modal = false
      },
      upload(){
          console.log('uploadTask')
      },
    },
  }

</script>

<template>
  <div class="mainContainer">
    <div class="pageHeadingComponent">
      <h1 class="pageHeadingH1">⚒️ Tasks</h1>

      <button class="pageHeadingButton" @click="uploadTask">Upload Tasks</button>
    </div>

    <div class="spacer10"></div>

    <div>
      Tasks Here
    </div>
    <TaskUploadForm  v-bind:modal="open_modal" @closeModal="onClickCloseModal()"  @uploadTask="upload()" />
  </div>
</template>


<script lang='js'>

  import { ref } from 'vue'
  import { reactive } from 'vue'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon, EyeIcon, PencilIcon, TrashIcon , ClipboardCheckIcon, XIcon } from '@heroicons/vue/outline'

export default {
     name: "TaskDetail",

    components: {
      Dialog,
      DialogOverlay,
      DialogTitle,
      TransitionChild,
      TransitionRoot,
      ExclamationIcon,
      EyeIcon,
      PencilIcon,
      TrashIcon,
      ClipboardCheckIcon,
      XIcon,
    },
    data() {
      return {
        selectedFile: '',
       
      }
    },
  setup() {
      let open_modal = ref(false);
      const open = ref(true)

      return {
        open,
        open_modal
      }
    },
    props: {
      data: Object,
      modal: Boolean,
    },
    methods:{
        closeModal(){
            this.$emit('closeModal')
        },
    },
}
</script>

<style>
</style>

<template>
  <TransitionRoot as="template" :show="modal">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="open = false"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              w-full
              inline-block
              align-bottom
              bg-white
              rounded-lg
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
            "
          >
            <div class="flex justify-between items-center pr-4">
              <DialogTitle
                as="h3"
                class="p-4 text-lg leading-6 font-semibold text-gray-900"
              >
                ⚒️ Task Detail
              </DialogTitle>

              <div @click="closeModal">
                <XIcon class="h-5" />
              </div>
            </div>

            <div class="p-4">
              <div class="pb-4">
                Task Code :
                {{ data?.task_code }}
              </div>

              <div class="pb-4">
                Task Name :
                {{ data?.task_name }}
              </div>

              <div class="pb-4">
                Status :
                {{ data?.status }}
              </div>
              
              <div class="pb-4">
                Logs :
                  <pre class="text-xs" v-for=" index in data?.logs" :key="index">
                        {{index?.employee_code}} {{index?.logedTime}}
                  </pre>
              </div>

            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


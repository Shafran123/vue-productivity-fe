
<script lang='js'>

  import { ref } from 'vue'
  import { reactive } from 'vue'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'

export default {


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
    },
  setup() {
      let open_modal = ref(true);
      const open = ref(true)

      return {
        open,
        open_modal
      }
    },
    props: ['modal' , 'heading'],
    methods:{
        closeModal(){
            this.$emit('closeModal')
        },
        _delete(){
            this.$emit('delete')
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
            <DialogTitle
              as="h3"
              class="p-4 text-lg leading-6 font-semibold text-gray-900"
            >
              {{heading}}
            </DialogTitle>
            <div class="p-4 pt-0">
              <div class="pl-1">
The operation detele will cannot be undone!<br>
                Are you sure you want to delete?
              </div>
                
            </div>

            <div
              class="
                bg-gray-50
                px-4
                py-3
                sm:px-6 sm:flex sm:flex-row-reverse
                justify-between
              "
            >
              <button
                type="button"
                class="
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-transparent
                  shadow-sm
                  px-4
                  py-2
                  bg-red-500
                  text-base
                  font-medium
                  text-white
                  hover:bg-red-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-red-500
                  sm:ml-3 sm:w-auto sm:text-sm
                "
                @click="_delete()"
              >
                Delete
              </button>
              <button
                type="button"
                class="
                  mt-3
                  w-full
                  inline-flex
                  justify-center
                  rounded-md
                  border border-gray-300
                  shadow-sm
                  px-4
                  py-2
                  bg-white
                  text-base
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                  sm:mt-0 sm:w-auto sm:text-sm
                "
                @click="closeModal()"
                ref="cancelButtonRef"
              >
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


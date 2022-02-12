<script lang="js">

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
    data() {
      return {
        tableData: [1, 3, 4],
        errors: []
      }
    },
    mounted() {
      console.log('Component mounted.')
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
      addteam() {
        console.log('On Click.')
        this.open_modal = !this.open_modal
      },

      onClickAddTeamCloseModal() {
        this.open_modal = false
      }
    }
  }

</script>

<style scoped>
  .mainContainer{
    @apply p-6 md:p-0
  }

  .pageHeadingComponent{
    @apply flex justify-between
  }

  .pageHeadingH1{
    @apply text-3xl font-bold
  }

  .pageHeadingButton{
    @apply bg-cyan-500 text-white rounded-md p-2 text-sm
  }

  .spacer10{
    @apply h-10

  }

  .tableMainContainer{
    @apply flex flex-col
  }

  .mainTableWrapper{
    @apply -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8
  }

  .tableContentInnerWrraper{
   @apply py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8
  }

  .tableShadowContainer{
     @apply   shadow   overflow-hidden  border-b border-gray-200 sm:rounded-lg
  }

  .tableStyles{
    @apply min-w-full divide-y divide-gray-200
  }

  .tableHeadStyles{
    @apply bg-cyan-50
  }

  .thStyles{
     @apply  px-6 py-3  text-left text-xs font-medium  text-gray-500 uppercase  tracking-wider
  }

  .thAction{
    @apply   relative px-10 py-3  text-xs  font-medium  text-gray-500
  }

  .tableBodyStyles{
    @apply bg-white divide-y divide-gray-200
  }

  .tableDataStyles{
    @apply px-6 py-4 whitespace-nowrap
  }

  .txtTableData{
    @apply text-sm font-medium text-gray-900
  }
</style>

<template>
  <div class="mainContainer">
    <div class="pageHeadingComponent">
      <h1 class="pageHeadingH1">Teams</h1>

      <button class="pageHeadingButton" @click="addteam">
        Add Team
      </button>
    </div>

    <div class="spacer10"></div>

    <div class="tableMainContainer">
      <div class="mainTableWrapper">
        <div class="tableContentInnerWrraper">
          <div class="tableShadowContainer">
            <table class="tableStyles">
              <thead class="tableHeadStyles">
                <tr>
                  <th scope="col" class="thStyles">
                    Team Code
                  </th>
                  <th scope="col" class="thStyles">
                    Team Name
                  </th>
                  <th scope="col" class="thStyles">
                    Start Date
                  </th>
                  <th scope="col" class="thStyles">
                    End Date
                  </th>
                  <th scope="col" class="thStyles">
                    Status
                  </th>
                  <th scope="col" class="thAction">
                    Actions
                    <!-- <span class="sr-only">Edit</span> -->
                  </th>
                </tr>
              </thead>
              <tbody class="tableBodyStyles">
                <tr v-for="index in tableData" :key="index">
                  <td class="tableDataStyles">
                    <div class="flex items-center">

                        <div class="txtTableData">
                          ABC_!23
                  
                      </div>
                    </div>
                  </td>
                  <td class="tableDataStyles">
                    <div class="flex items-center">
      
                        <div class="txtTableData">
                          WebShop
                        </div>
     
                    </div>
                  </td>
                  <td class="tableDataStyles">
                    <div class="txtTableData">12/02/2022</div>
                  </td>

                  <td class="tableDataStyles">
                    <div class="txtTableData">12/02/2022</div>
                  </td>

                  <td class="tableDataStyles">
                    <span class="
                        px-2
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        rounded-full
                        bg-green-100
                        text-green-800
                      ">
                      Active
                    </span>
                  </td>

                  <td class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-center text-sm
                      font-medium
                    ">
                    <div class="flex justify-evenly items-center">
                      <div>
                        <EyeIcon class="h-5 text-gray-500" />
                      </div>
                      <div>
                        <PencilIcon class="h-4 text-gray-500" />
                      </div>
                      <div>
                        <TrashIcon class="h-4 text-gray-500" />
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- More people... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="open_modal">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
        <div class="
            flex
            items-end
            justify-center
            min-h-screen
            pt-4
            px-4
            pb-20
            text-center
            sm:block sm:p-0
          ">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
            leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div class="
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
              ">
              <DialogTitle as="h3" class="p-4 text-lg leading-6 font-semibold text-gray-900">
                Create Team
              </DialogTitle>
              <div class="p-4 pt-0">
                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700">Team Code</label>
                  <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="
                      h-10
                      pl-3
                      mt-1
                      mb-3
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-400 border-[1px]
                      rounded-md
                    " />
                </div>

                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700">Team Name</label>
                  <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="
                      h-10
                      pl-3
                      mt-1
                      mb-3
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-400 border-[1px]
                      rounded-md
                    " />
                </div>

                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700">Start Date</label>
                  <input type="date" name="first-name" id="first-name" autocomplete="given-name" class="
                      h-10
                      pl-3
                      pr-3
                      mt-1
                      mb-3
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-400 border-[1px]
                      bg-white
                      rounded-md
                    " />
                </div>

                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700">End Date</label>
                  <input type="date" name="first-name" id="first-name" autocomplete="given-name" class="
                      h-10
                      pl-3
                      pr-3
                      mt-1
                      mb-3
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-400 border-[1px]
                      bg-white
                      rounded-md
                    " />
                </div>

                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700">Status</label>
                  <select type="option" name="first-name" id="first-name" autocomplete="given-name" class="
                      h-10
                      pl-3
                      pr-3
                      mt-1
                      mb-3
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-400 border-[1px]
                      bg-white
                      rounded-md
                    ">
                    <option value="1">Active</option>
                    <option value="0">InActive</option>
                  </select>
                </div>
              </div>

              <div class="
                  bg-gray-50
                  px-4
                  py-3
                  sm:px-6 sm:flex sm:flex-row-reverse
                  justify-between
                ">
                <button type="button" class="
                    w-full
                    inline-flex
                    justify-center
                    rounded-md
                    border border-transparent
                    shadow-sm
                    px-4
                    py-2
                    bg-cyan-500
                    text-base
                    font-medium
                    text-white
                    hover:bg-cyan-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-cyan-500
                    sm:ml-3 sm:w-auto sm:text-sm
                  " @click="open_modal = false">
                  Create Team
                </button>
                <button type="button" class="
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
                  " @click="open_modal = false" ref="cancelButtonRef">
                  Cancel
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
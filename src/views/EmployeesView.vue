<script lang="js">
 import { ref } from 'vue'
  import { reactive } from 'vue'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import EmployeeForm from '@/components/EmployeeForm.vue'
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
      EmployeeForm,
    },
    setup(){
      let open_modal = ref(false);
      const open = ref(true)

      return {
        open,
        open_modal
      }
    },
      data() {
      return {
        tableData: [1, 3, 4],
        errors: [],
      }
    },
  methods: {
      addemp() {
        console.log('On Click Add Emp.')
         this.open_modal = !this.open_modal
      },

      onClickCloseModal(){
        console.log('On Click Close Modal')
         this.open_modal = false
      },

      onClickAddEmployee(){
        console.log('Add Employee Cliked')
      },
    },
  }

</script>

<template>
  <div class="mainContainer">
    <div class="pageHeadingComponent">
      <h1 class="pageHeadingH1">Employees</h1>

      <button class="pageHeadingButton" @click="addemp">Add Employee</button>
    </div>

    <div class="spacer10"></div>

    <div class="tableMainContainer">
      <div class="mainTableWrapper">
        <div class="tableContentInnerWrraper">
          <div class="tableShadowContainer">
            <table class="tableStyles">
              <thead class="tableHeadStyles">
                <tr>
                  <th scope="col" class="thStyles">Team Code</th>
                  <th scope="col" class="thStyles">Team Name</th>
                  <th scope="col" class="thStyles">Start Date</th>
                  <th scope="col" class="thStyles">End Date</th>
                  <th scope="col" class="thStyles">Status</th>
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
                      <div class="txtTableData">ABC_!23</div>
                    </div>
                  </td>
                  <td class="tableDataStyles">
                    <div class="flex items-center">
                      <div class="txtTableData">WebShop</div>
                    </div>
                  </td>
                  <td class="tableDataStyles">
                    <div class="txtTableData">12/02/2022</div>
                  </td>

                  <td class="tableDataStyles">
                    <div class="txtTableData">12/02/2022</div>
                  </td>

                  <td class="tableDataStyles">
                    <span
                      class="
                        px-2
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        rounded-full
                        bg-green-100
                        text-green-800
                      "
                    >
                      Active
                    </span>
                  </td>

                  <td
                    class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-center text-sm
                      font-medium
                    "
                  >
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

    <EmployeeForm v-bind:modal="open_modal"  @closeModal="onClickCloseModal()" @addEmployee="onClickAddEmployee()" />
  </div>
</template>

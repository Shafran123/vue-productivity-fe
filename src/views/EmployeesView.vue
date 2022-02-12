<script lang="js">
  import { ref } from 'vue'
  import { reactive } from 'vue'
  import moment from 'moment'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
  import EmployeeForm from '@/components/EmployeeForm.vue'
  import axios_i from '../services/axiosinstance'
  import DeleteModal from '@/components/DeleteModal.vue'
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
      DeleteModal
    },
     mounted() {
      console.log('Component mounted.')
      this.getAllEmployees()
    },

    setup(){
      let open_modal = ref(false);
      let open_delete_modal = ref(false);
      const open = ref(true)

      return {
        open,
        open_modal,
        open_delete_modal
      }
    },
      data() {
      return {
        editMode: false,
        data : '',
        selectedEmp : '',
        tableData: [],
        errors: [],
      }
    },
  methods: {
      moment: function (date) {
            return moment(date);
        },

      getAllEmployees(){
          axios_i.get('emp/get-all-employees').then(res => {
            console.log(res)
            this.tableData = res.data.data
          }).catch(err => {
            console.log(err)
          })
      },

      addemp() {
        console.log('On Click Add Emp.')
         this.open_modal = !this.open_modal
      },

      onClickCloseModal(){
        console.log('On Click Close Modal')
        this.editMode = false
         this.open_modal = false
      },
      onClickCloseModalDelete(){
        this.open_delete_modal = false
      },

      onClickAddEmployee(data){
        console.log('Add Employee Cliked' , data)

           axios_i.post('emp/create-emp', data).then(res => {
            console.log(res)
            this.getAllEmployees()
              this.open_modal = false
          }).catch(err => {
            console.log(err)
          })

      },
      onClickEditEmp(emp){
        this.editMode = true 
        this.data = emp
        this.open_modal = !this.open_modal
      },
      onClickEditEmployee(emp){
        console.log(emp);
            axios_i.put(`emp/update-employee?emp_code=${emp.emp_code}`, emp).then(res => {
              console.log(res);
              this.getAllEmployees()
              this.open_modal = false
            }).catch(err => {
              console.log(err);
            })
      },
      onClickDeleteIconEmp(emp){
        console.log(emp);
        this.selectedEmp = emp
        this.open_delete_modal = true

      },
      onClickDelete(){
         axios_i.delete(`emp/delete-employee?emp_code=${this.selectedEmp.emp_code}`).then(res => {
                 this.getAllEmployees()
                  this.open_delete_modal = false
           }).catch(err => {
             console.log(err);
           })
      }
    },
  }

</script>

<template>
  <div class="mainContainer">
    <div class="pageHeadingComponent">
      <h1 class="pageHeadingH1">👨‍💻 Employees </h1>

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
                  <th scope="col" class="thStyles">Join Date</th>
                  <th scope="col" class="thStyles">Team</th>
                
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
                      <div class="txtTableData">{{index.emp_code}}</div>
                    </div>
                  </td>
                  <td class="tableDataStyles">
                    <div class="flex items-center">
                      <div class="txtTableData">{{index.emp_name}}</div>
                    </div>
                  </td>
                  <td class="tableDataStyles">
                    <div class="txtTableData">{{ moment(index.join_date).format("DD/MM/YY") }}</div>
                  </td>

                  <td class="tableDataStyles">
                    <div class="txtTableData">{{index.team_code}}</div>
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
                      <!-- <div>
                        <EyeIcon class="h-5 text-gray-500" />
                      </div> -->
                      <div @click="onClickEditEmp(index)"> 
                        <PencilIcon class="h-4 text-gray-500" />
                      </div>
                      <div  @click="onClickDeleteIconEmp(index)">
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

    <EmployeeForm  
    v-bind:modal="open_modal" 
    v-bind:editMode="this.editMode"  
    v-bind:data="this.data" 
    @closeModal="onClickCloseModal()" 
    @addEmployee="onClickAddEmployee"
    @editEmployee="onClickEditEmployee"
     />

     <DeleteModal v-bind:modal="open_delete_modal" v-bind:heading="'👨‍💻 Delete Employee'" @closeModal="onClickCloseModalDelete()" @delete="onClickDelete()" />
  </div>
</template>

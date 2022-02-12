<script lang="js">

  import { ref } from 'vue'
import moment from 'moment'
  import { reactive } from 'vue'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
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
      DeleteModal
    },
    data() {
      return {
        editMode: false,
        team_added_sucess: false,
        team_added_failed: false,
        form:{
          team_code: '',
          team_name: '',
          start_date: Date.now(),
          end_date:'',
          status: 'true',
        },
        tableData: [],
        errors: [],
      }
    },
    mounted() {
      console.log('Component mounted.'),

      this.getTeams()

    },
    setup() {
      let open_modal = ref(false);
      let open_delete_modal = ref(false);
      const open = ref(true)

      return {
        open,
        open_modal,
        open_delete_modal
      }
    },
    methods: {
      addteam() {
        console.log('On Click.')
         this.team_added_sucess= false,
       this.team_added_failed= false,
        this.open_modal = !this.open_modal
      },

      onClickAddTeamCloseModal() {
    
        this.form.team_code = '',
         this.form.team_name = '',
            this.form.start_date = '',
             this.form.end_date = '',
                  this.form.status = 'true',
        this.team_added_sucess= false,
        this.team_added_failed= false,
        this.editMode = false,
        this.open_modal = false
      },
      getTeams(){
          console.log('Get dTAA');


        axios_i.get('user/get-all-teams').then(res => {
            console.log(res)
            this.tableData = res.data.data
          }).catch(err => {
            console.log(err)
          })

      },
      createTeam(){
          
          axios_i.post('user/create-team', this.form).then(res => {
            console.log(res)
            this.team_added_sucess = true
                 this.open_modal = false
                  this.getTeams()
          }).catch(err => {
            this.team_added_failed = true
                   this.open_modal = false
            console.log(err)
          })
      },

      editTeam(){
        console.log('Edit Team');

         axios_i.put(`user/update-team?team_code=${this.form.team_code}`, this.form).then(res => {
            console.log(res)
            this.form.team_code = '',
            this.form.team_name = '',
            this.form.start_date = '',
            this.form.end_date = '',
            this.form.status = 'true',
            this.getTeams(),
            this.team_added_sucess = true
                 this.open_modal = false
          }).catch(err => {
            this.team_added_failed = true
                   this.open_modal = false
            console.log(err)
          })

      },
      moment: function (date) {
            return moment(date);
        },
        onClickTask(task){
          console.log(task , moment(task.start_date).format('YYYY/MM/DD'));
          this.form.team_code = task.team_code,
          this.form.team_name = task.team_name,
          this.form.start_date = moment(task.start_date).format('YYYY-MM-DD') ,
          this.form.end_date =  moment(task.end_date).format('YYYY-MM-DD') ,
          this.form.status = task.status

          this.editMode = true
          this.open_modal = true
        },
        onClickCloseModal(){
     
                this.form.team_code = '',
                this.open_delete_modal = false
        },

        openDeleteModal(task){
          this.form.team_code = task.team_code
          this.open_delete_modal = true
        },  
        onClickDelete(){
          console.log('delete');
           axios_i.delete(`user/delete-team?team_code=${this.form.team_code}`, this.form).then(res => {
                 this.getTeams()
                  this.open_delete_modal = false
           }).catch(err => {
             console.log(err);
           })
        }
    }
  }

</script>

<style scoped>
.mainContainer {
  @apply p-6 md:p-0;
}

.pageHeadingComponent {
  @apply flex justify-between;
}

.pageHeadingH1 {
  @apply text-3xl font-bold;
}

.pageHeadingButton {
  @apply bg-cyan-500 text-white rounded-md p-2 text-sm;
}

.spacer10 {
  @apply h-10;
}

.tableMainContainer {
  @apply flex flex-col;
}

.mainTableWrapper {
  @apply -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8;
}

.tableContentInnerWrraper {
  @apply py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8;
}

.tableShadowContainer {
  @apply shadow   overflow-hidden  border-b border-gray-200 sm:rounded-lg;
}

.tableStyles {
  @apply min-w-full divide-y divide-gray-200;
}

.tableHeadStyles {
  @apply bg-cyan-50;
}

.thStyles {
  @apply px-6 py-3  text-left text-xs font-medium  text-gray-500 uppercase  tracking-wider;
}

.thAction {
  @apply relative px-10 py-3  text-xs  font-medium  text-gray-500;
}

.tableBodyStyles {
  @apply bg-white divide-y divide-gray-200;
}

.tableDataStyles {
  @apply px-6 py-4 whitespace-nowrap;
}

.txtTableData {
  @apply text-sm font-medium text-gray-900;
}
</style>

<template>
  <div class="mainContainer">
    <div class="pageHeadingComponent">
      <h1 class="pageHeadingH1">🏋️ Teams</h1>

      <button class="pageHeadingButton" @click="addteam">Add Team</button>
    </div>

    <div class="spacer10"></div>

    <div
      v-if="team_added_sucess"
      class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-10"
      role="alert"
    >
      <p class="font-bold">Sucess</p>
      <p>Team Added Sucessfully!.</p>
    </div>

    <div
      v-if="team_added_failed"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-10"
      role="alert"
    >
      <p class="font-bold">Opps</p>
      <p>Something Went Wrong!</p>
    </div>

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
                      <div class="txtTableData">{{ index.team_code }}</div>
                    </div>
                  </td>
                  <td class="tableDataStyles">
                    <div class="flex items-center">
                      <div class="txtTableData">{{ index.team_name }}</div>
                    </div>
                  </td>
                  <td class="tableDataStyles">
                    <div class="txtTableData">
                      {{ moment(index.start_date).format("DD/MM/YY") }}
                    </div>
                  </td>

                  <td class="tableDataStyles">
                    <div class="txtTableData">
                      {{ moment(index.end_date).format("DD/MM/YY") }}
                    </div>
                  </td>

                  <td class="tableDataStyles">
                    <span
                      v-if="index.status"
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
                    <span
                      v-if="!index.status"
                      class="
                        px-2
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        rounded-full
                        bg-red-100
                        text-red-800
                      "
                    >
                      InActive
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
                      <!-- <div>
                        <EyeIcon class="h-5 text-gray-500" />
                      </div> -->
                      <div @click="onClickTask(index)">
                        <PencilIcon class="h-4 text-gray-500" />
                      </div>
                      <div @click="openDeleteModal(index)">
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
                🏋️ {{ editMode ? "Edit" : "Create" }} Team
              </DialogTitle>

              <div class="p-4 pt-0">
                <div>
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >Team Code</label
                  >
                  <input
                    type="text"
                    v-model="form.team_code"
                    name="first-name"
                    :disabled="editMode"
                    id="first-name"
                    autocomplete="given-name"
                    class="
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
                    "
                  />
                </div>

                <div>
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >Team Name</label
                  >
                  <input
                    type="text"
                    v-model="form.team_name"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    class="
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
                    "
                  />
                </div>

                <div>
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >Start Date</label
                  >
                  <input
                    type="date"
                    v-model="form.start_date"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    class="
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
                    "
                  />
                </div>

                <div>
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >End Date</label
                  >
                  <input
                    type="date"
                    v-model="form.end_date"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    class="
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
                    "
                  />
                </div>

                <div>
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >Status</label
                  >
                  <select
                    type="option"
                    v-model="form.status"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    class="
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
                    "
                  >
                    <option value="true">Active</option>
                    <option value="false">InActive</option>
                  </select>
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
                  "
                  @click="editMode ? editTeam() : createTeam()"
                >
                  {{ editMode ? "Edit" : "Create" }} Team
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
                  @click="onClickAddTeamCloseModal()"
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

    <DeleteModal v-bind:modal="open_delete_modal" v-bind:heading="'🏋️ Delete Team'" @closeModal="onClickCloseModal()" @delete="onClickDelete()" />
  </div>
</template>
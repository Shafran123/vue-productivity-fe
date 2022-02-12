
<script lang='js'>

  import { ref } from 'vue'
  import { reactive } from 'vue'
    import moment from 'moment'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
 import axios_i from '../services/axiosinstance'
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
    updated(){
      console.log('updates');
      if(this.editMode){
        this.form.emp_code = this.data.emp_code,
        this.form.emp_name = this.data.emp_name,
        this.form.team_code = this.data.team_code,
        this.form.join_date =  moment(this.data.join_date).format('YYYY-MM-DD')
      }else{
        this.form.emp_code = '',
        this.form.emp_name = '',
        this.form.team_code = '',
        this.form.join_date =  ''
      }
    },
    data() {
      return {
        teams: [],
       form:{
          emp_code: '',
          emp_name: '',
          team_code : '',
          join_date: Date.now()
        },
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
    props: ['modal' , 'editMode' , 'data'],
      mounted() {
      console.log('Component mounted.' ),

      this.getTeams()

    },
    methods:{
         moment: function (date) {
            return moment(date);
        },
        getTeams(){
        axios_i.get('user/get-all-teams').then(res => {
            console.log(res)
            this.teams = res.data.data
          }).catch(err => {
            console.log(err)
          })
        },

        closeModal(){
            this.$emit('closeModal')
        },
        
        addEmployee(){
          console.log(this.form)
            this.$emit('addEmployee' , this.form)
        },

        editEmployee(){
          console.log('edit emp'),
          this.$emit('editEmployee' , this.form)
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
              👨‍💻 {{editMode ? 'Edit' : 'Add'}}  Employee
            </DialogTitle>
            <div class="p-4 pt-0">
              <div>
                <label
                  for="first-name"
                  class="block text-sm font-medium text-gray-700"
                  >Employee Code</label
                >
                <input
                  type="text"
                  name="emp-code"
                  :disabled="editMode"
                  id="emp-cdoe"
                  v-model="form.emp_code"
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
                  >Employee Name</label
                >
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                      v-model="form.emp_name"
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
                  >Team </label
                >
                <select
                type="option"
                      v-model="form.team_code"
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
                             bg-white
                    rounded-md
                  "
                 >
                      <option v-for="index in teams" :key="index" :value="index.team_code">{{index.team_name}}</option>
                 </select>
              </div>

              <div>
                <label
                  for="first-name"
                  
                  class="block text-sm font-medium text-gray-700"
                  >Join Date</label
                >
                <input
                  type="date"
                       v-model="form.join_date"
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
                @click="editMode ? editEmployee() : addEmployee()"
              >
                {{editMode ? 'Edit' :'Add'}}  Employee
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


<script lang="js">
  import axios_i from '../services/axiosinstance'

  export default {

    data(){
      return{
        email: '', 
        password: '',
        login_error: false
      }
    },

     methods: {
      login() {
        this.login_error = false     
        console.log('Login Clikc')
        let data = {
          email : this.email,
          password : this.password
        }

          axios_i.post('user/login' , data).then(res => {
            console.log(res);
            try {
            localStorage.setItem('token' , res.data.token)
            localStorage.setItem('user' , JSON.stringify(res.data.user))

              this.$router.push({ name: "teams"})
            } catch (error) {
                console.log(error);
            }
  

          
          }).catch(err => {
            console.log(err ,);
            this.login_error = true          
            })
         
      },
    },
}
</script>

<template>
  <div>
    <div class="flex flex-wrap overflow-hidden items-center">
      <div
        class="
          flex flex-col
          justify-center
          w-full
          overflow-hidden
          md:w-1/2
          bg-white
          h-screen
          xxs:p-5
          md:p-20
        "
      >
        <!-- Column Content -->

        <div>
          <img
            src="https://mondia.com/wp-content/themes/mondia/assets/images/logow.svg"
            class="bg-red-500 h-10"
            alt=""
          />
        </div>

        <div class="spacer10"></div>

        <div class="text-3xl">🎉</div>
        <div class="text-3xl font-semibold">Welcome</div>

        <div class="text-sm pt-2">Track Your Work... Easily with platform</div>

        <div class="pt-4">
          <label class="font-semibold"> Email Address </label>
          <input
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
            type="email"
            name=""
            v-model="email"
            id=""
          />
        </div>

        <div class="pt-2">
          <label class="font-semibold"> Password </label>
          <input
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
            type="password"
            name=""
            id=""
            v-model="password"
          />
        </div>

        <div v-if="login_error" class="text-red-500">Something Went Wrong!</div>

        <div class="pt-4">
          <button
            @click="login()"
            class="
              w-full
              bg-cyan-500
              text-white
              rounded-md
              p-3
              text-md
              font-semibold
            "
          >
            Login
          </button>
        </div>
      </div>

      <div
        class="
          w-full
          overflow-hidden
          xxs:hidden
          md:flex md:w-1/2
          justify-center
          items-center
          h-screen
          bg-cyan-600
        "
      >
        <!-- Column Content -->
        <div>
          <div class="text-4xl font-bold text-white">Deliver Work OnTime</div>
          <div class="pt-2 text-4xl font-bold text-white">
            Witout Any Hazzel!
          </div>

          <div class="text-white pt-2">
            Manage Track Organize All in one place
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

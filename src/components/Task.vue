<script lang="js">
export default {
  name: "Task",
   props: {
            data: Object
        },
};
</script>

<template>
  <div
    class="
      flex flex-col
      justify-between
      font-semibold
      p-4
      h-28
      mr-10
      rounded-md
      bg-white
      shadow-md
      hover:border-2
      border-cyan-500
      focus:ring-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2
    "
  >
    <div class="text-[18px] xxs:text-[16px]">{{ data?.task_name }}</div>

    <div class="text-[14px] font-medium xxs:text-[12px]">{{ data?.project }}</div>
  </div>
</template>

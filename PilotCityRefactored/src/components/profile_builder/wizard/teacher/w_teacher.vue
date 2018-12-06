<template>
        <router-view />
</template>

<script>
export default {
    name: 'w_teacher'
}
</script>

<style>

.prev_button {
  position: absolute;
  bottom: 100px;
  left: 100px;
  font-weight: 600;
  border-radius: 50px;
  font-size: 3vh;
}
.prev_button:hover {
    font-weight: bold;
    border-radius: 50px;
    font-color: rgb(222, 223, 224);
    background-color:#404041;
    border-color:#404041;
} 


</style>

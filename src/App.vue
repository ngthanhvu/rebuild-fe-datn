<template>
  <router-view />
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>
<script setup>
import { Notivue, Notification, push } from 'notivue'
</script>
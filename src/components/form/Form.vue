<template>
  <form @submit.prevent>
    <slot />
  </form>
</template>

<script>
export default {};
</script>

<style>
.form-control {
  margin-bottom: 1rem;
}

.form-control label {
  clear: both;
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
  width: 100%;
}

.form-control input[type="text"],
.form-control select {
  border-width: 1px;
  border-radius: 0.25rem;
  display: block;
  padding: 0.5rem 0.25rem;
}

.form-control input[type="text"]:last-child,
.form-control select:last-child {
  width: 100%;
}

.form-control input[type="checkbox"] {
  cursor: pointer;
  height: 32px;
  width: 32px;
}
</style>
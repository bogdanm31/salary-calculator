<template>
  <main>
    <Form>
      <div class="form-control">
        <label>Salariu brut:</label>
        <input type="text" v-model.number="gross" />
      </div>
    </Form>
    <template v-if="gross">
      <WithUniqueTax :gross="gross" />
      <br />
      <WithProgressiveTax :gross="gross" />
    </template>
  </main>
</template>

<script>
import { ref } from "vue";
import Form from "@/components/form/Form";
import WithUniqueTax from "@/components/salaryTable/WithUniqueTax";
import WithProgressiveTax from "@/components/salaryTable/WithProgressiveTax";

export default {
  components: {
    Form,
    WithUniqueTax,
    WithProgressiveTax,
  },
  setup() {
    const gross = ref(null);

    return {
      gross,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

main {
  width: 90%;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead,
tr {
  border-bottom: 1px solid #ddd;
}

td {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

tfoot {
  font-weight: 600;
  border-bottom: 1px solid #333;
}
</style>

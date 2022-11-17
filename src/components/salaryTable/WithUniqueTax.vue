<template>
  <h2>Curent</h2>
  <p>
    <label>Salariu brut:</label>
    <span>{{ details.gross }}</span>
  </p>
  <p>
    <label>CAS ({{ uniqueTax.cas }}%):</label>
    <span>{{ details.cas }}</span>
  </p>
  <p>
    <label>CASS ({{ uniqueTax.cass }}%):</label>
    <span>{{ details.cass }}</span>
  </p>
  <p>
    <label>Total contributii:</label>
    <span>{{ details.cas + details.cass }}</span>
  </p>
  <p>
    <label>Venit:</label>
    <span>{{ details.venit }}</span>
  </p>
  <hr />
  <table>
    <thead>
      <th></th>
      <th>Fara scutire iv</th>
      <th>Scutire iv</th>
    </thead>
    <tr>
      <th>Impozit</th>
      <td>{{ details.impozit }}</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Salariu net</th>
      <td>{{ details.net }}</td>
      <td>{{ details.venit }}</td>
    </tr>
  </table>
</template>

<script>
import { toRefs, computed } from "vue";
import { useTaxes } from "@/hooks/use-taxes";
import uniqueTax from "@/data/unique-tax";

export default {
  props: {
    gross: {
      type: Number,
    },
  },
  setup(props) {
    const { gross } = toRefs(props);
    const { salaryDetails } = useTaxes();

    const details = computed(() => salaryDetails(gross.value, uniqueTax));

    return {
      details,
      uniqueTax,
    };
  },
};
</script>

<style scoped>
label {
  display: inline-block;
  font-weight: 600;
  min-width: 160px;
}
</style>
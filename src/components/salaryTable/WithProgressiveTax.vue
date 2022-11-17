<template>
  <h2>Progresiv</h2>
  <p>
    <label>CAS:</label>
    <span>{{ salaryResume.cas }}</span>
  </p>
  <p>
    <label>CASS:</label>
    <span>{{ salaryResume.cass }}</span>
  </p>
  <p>
    <label>Total contributii:</label>
    <span>{{ salaryResume.cas + salaryResume.cass }}</span>
  </p>
  <p>
    <label>Venit:</label>
    <span>{{ salaryResume.venit }}</span>
  </p>
  <hr />
  <br />
  <table>
    <thead>
      <th></th>
      <th>Fara scutire iv</th>
      <th>Scutire iv</th>
    </thead>
    <tr>
      <th>Impozit</th>
      <td>{{ salaryResume.impozit }}</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Salariu net</th>
      <td>
        {{ salaryResume.net }}
      </td>
      <td>
        {{ salaryResume.venit }}
      </td>
    </tr>
  </table>
  <br />
  <h3>Taxe</h3>
  <table>
    <thead>
      <th>Interval</th>
      <th>CAS</th>
      <th>CASS</th>
      <th>Impozit*</th>
    </thead>
    <tr v-for="row in progressiveData" :key="row.interval">
      <td v-for="col in ['interval', 'cas', 'cass', 'impozit']" :key="col">
        {{ row[col] }}
      </td>
    </tr>
    <tfoot style="font-weight: 600">
      <td>Total taxe</td>
      <td>{{ salaryResume.cas }}</td>
      <td>{{ salaryResume.cass }}</td>
      <td>{{ salaryResume.impozit }}</td>
    </tfoot>
  </table>
</template>

<script>
import { computed, toRefs } from "vue";
import progressiveTax from "@/data/progressive-tax";
import { useTaxes } from "@/hooks/use-taxes";

export default {
  props: {
    gross: {
      type: Number,
    },
  },
  setup(props) {
    const { gross } = toRefs(props);
    const { salaryDetails } = useTaxes();

    const progressiveData = computed(() => {
      let min = 0,
        index = 0,
        remainingSum = gross.value;
      const data = [];

      while (remainingSum) {
        const taxes = progressiveTax[index],
          { stepMax } = taxes;

        let stepGross;
        if (!stepMax || stepMax > gross) {
          stepGross = gross.value - min;
        } else {
          stepGross = Math.min(stepMax - min, remainingSum);
        }

        let interval;
        if (!min) {
          interval = `-${stepGross}`;
        } else if (!progressiveTax[index + 1]) {
          interval = `+${min}`;
        } else {
          interval = `${min + 1}-${Math.min(stepMax, gross.value)}`;
        }

        data.push({
          interval,
          ...salaryDetails(stepGross, taxes),
        });
        min = stepMax;
        index++;
        remainingSum -= stepGross;
      }
      return data;
    });

    const salaryResume = computed(() =>
      progressiveData.value.reduce(
        (acc, row) => {
          acc.venit += row.venit;
          acc.net += row.net;
          acc.cas += row.cas;
          acc.cass += row.cass;
          acc.impozit += row.impozit;
          return acc;
        },
        { venit: 0, net: 0, cas: 0, cass: 0, impozit: 0 }
      )
    );

    return {
      progressiveData,
      salaryResume,
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
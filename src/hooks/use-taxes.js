export const useTaxes = () => {
  const gross2Net = (gross, taxes, exception = false) => {
    let sum = (gross * (100 - taxes.cas - taxes.cass)) / 100;
    if (!exception && taxes.impozit) {
      sum = (sum * (100 - taxes.impozit)) / 100;
    }
    return Math.round(sum);
  };

  const sumTax = (sum, taxPercent) => Math.round((sum * taxPercent) / 100);

  const grossAmountTaxes = (sum, taxes) => {
    const cas = sumTax(sum, taxes.cas),
      cass = sumTax(sum, taxes.cass),
      impozit = sumTax(sum - cas - cass, taxes.impozit);

    return {
      cas,
      cass,
      impozit
    };
  };

  const salaryDetails = (sum, taxes) => {
    const { cas, cass, impozit } = grossAmountTaxes(sum, taxes);

    const venit = gross2Net(sum, taxes, true);
    const net = gross2Net(sum, taxes);

    return {
      venit,
      net,
      cas,
      cass,
      impozit
    };
  };

  return {
    salaryDetails,
    grossAmountTaxes
  };
};

export const autoRank = (results) => {
  const valid = results.filter(r => r.status === "OK");

  valid.sort((a, b) => a.finishTime - b.finishTime);

  return valid.map((item, index) => ({
    ...item.toJSON(),
    position: index + 1,
  }));
};

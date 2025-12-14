export const autoRank = (results) => {
  // Filter for valid results: status must be "OK"
  const valid = results.filter(r => {
    const result = r.toJSON ? r.toJSON() : r;
    return result.status === "OK";
  });

  // Separate results with and without finishTime
  const withFinishTime = valid.filter(r => {
    const result = r.toJSON ? r.toJSON() : r;
    return result.finishTime !== null && 
           result.finishTime !== undefined && 
           typeof result.finishTime === 'number';
  });

  const withoutFinishTime = valid.filter(r => {
    const result = r.toJSON ? r.toJSON() : r;
    return result.finishTime === null || 
           result.finishTime === undefined || 
           typeof result.finishTime !== 'number';
  });

  // Sort results with finishTime by time (ascending - lowest time wins)
  withFinishTime.sort((a, b) => {
    const aTime = a.toJSON ? a.toJSON().finishTime : a.finishTime;
    const bTime = b.toJSON ? b.toJSON().finishTime : b.finishTime;
    return aTime - bTime;
  });

  // Assign positions to results with finishTime (1st place = fastest time)
  const ranked = withFinishTime.map((item, index) => {
    const result = item.toJSON ? item.toJSON() : item;
    return {
      ...result,
      position: index + 1,
    };
  });

  // Add results without finishTime at the bottom (no position assigned)
  const unranked = withoutFinishTime.map((item) => {
    const result = item.toJSON ? item.toJSON() : item;
    return {
      ...result,
      position: null, // No position for results without finishTime
    };
  });

  // Return ranked results first, then unranked results at the bottom
  return [...ranked, ...unranked];
};

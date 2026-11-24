export function validateForm(data) {
  const errors = [];

  // Validate method (pickup or delivery)
  const validMethods = ["pickup", "delivery"];
  if (!validMethods.includes(data.method)) {
    errors.push("Method must be pickup or delivery");
  }

  // Validate size
  const validSizes = ["small", "medium", "large"];
  if (!validSizes.includes(data.size)) {
    errors.push("Size must be small, medium, or large")
  }

  // Return result
  console.log(errors);
  return {
    isValid: errors.length === 0,
    errors,
  };
}

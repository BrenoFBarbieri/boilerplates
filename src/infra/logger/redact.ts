const redactFields = [
  'password',
  '*.password',
  'creditCardNumber',
  'address.zipcode',
  'authorization', // Authentication headers
  // 'email', // Optional field, depending on your policy
];

export { redactFields };


export type FieldType = 'email' | 'phone';

export const FieldRegEx = {
  email: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm,
  phone: /^[0-9]{10,}$/

};

export const isValidField = (value: any, type: FieldType) => {
  return FieldRegEx[type].test(value);
};
type ReferenceType = 'CLIENT' | 'ADMIN' | 'HOSPITAL_ADMIN';
export type PayloadType = {
  referenceType: ReferenceType;
  referenceId: number;
};

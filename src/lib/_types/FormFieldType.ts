const FormFieldTypes = ["text", "file", "radio", "select"] as const;

type FormFieldType = (typeof FormFieldTypes)[number];

export default FormFieldTypes;
export type { FormFieldType };

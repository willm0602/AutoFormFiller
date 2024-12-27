import { FormFieldType } from "./FormFieldType";

interface FormField {
    name: string;
    regex: string;
    value: string;
    fieldType: FormFieldType;
    id: number;
}

export default FormField;

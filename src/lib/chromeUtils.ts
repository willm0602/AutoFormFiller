import type FormField from "./_types/FormField";

const CHROME_STORAGE_NAME = "autoformfiller@willmigdol";

export function setFormFields(fields: FormField[]) {
    const formFieldsAsStr = JSON.stringify(fields);
    chrome.storage.local.set({ [CHROME_STORAGE_NAME]: formFieldsAsStr });
}

export async function getFormFields(): Promise<FormField[]> {
    return await chrome.storage.local.get(CHROME_STORAGE_NAME).then((val) => {
        const fieldsAsStr = val[CHROME_STORAGE_NAME];
        return fieldsAsStr ? JSON.parse(fieldsAsStr) : [];
    });
}

export async function createFormField() {
    const DEFAULT_FORM_FIELD: FormField = {
        name: "Untitled Field",
        regex: "",
        value: "",
        fieldType: "text",
        id: new Date().getTime(),
    };

    const fields = await getFormFields();
    fields.push(DEFAULT_FORM_FIELD);
    setFormFields(fields);
}

export async function updateFormField(fieldID: number, field: FormField) {
    const fields = (await getFormFields()).map((oldField) => {
        if (oldField.id === fieldID) return field;
        return oldField;
    });

    setFormFields(fields);
}

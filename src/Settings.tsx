import React, { useEffect, useState } from "react";
import ChromeStorageFile from "./lib/_types/ChromeStorageFile";
import FormField from "./lib/_types/FormField";
import FormFieldTypes, { FormFieldType } from "./lib/_types/FormFieldType";
import {
    createFormField,
    getFormFields,
    updateFormField,
} from "./lib/chromeUtils";
import loadReactComponent from "./loader";

const UpdateFormTextValue = (props: { formField: FormField }) => {
    const { formField } = props;
    return (
        <input
            type="text"
            defaultValue={formField.value}
            className="input input-primary input-bordered"
            onBlur={(e) => {
                updateFormField(formField.id, {
                    ...formField,
                    value: e.target.value,
                });
                window.location.reload();
            }}
        ></input>
    );
};

const UpdateFormFileValue = (props: { formField: FormField }) => {
    const { formField } = props;

    const chromeStorageFile: ChromeStorageFile = JSON.parse(formField.value);
    // temporary file just used to show the file name inside
    const file = new File(
        [chromeStorageFile.contents],
        chromeStorageFile.fileName,
        { type: chromeStorageFile.mimeType },
    );

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
        }
    }, [file]);

    return (
        <input
            ref={fileInputRef}
            type="file"
            name=""
            onChange={(e) => {
                const files = e.target.files;
                const file = files?.length ? files[0] : undefined;
                const reader = new FileReader();
                if (file === undefined) {
                    console.error("Could not load file");
                    return;
                }
                reader.readAsText(file);
                reader.onload = () => {
                    const mimeType = file.type;
                    const fileName = file.name;
                    const contents = reader.result || "";
                    const chromeStorageFile: ChromeStorageFile = {
                        fileName,
                        contents,
                        mimeType,
                    };
                    formField.value = JSON.stringify(chromeStorageFile);
                    updateFormField(formField.id, formField);
                };
            }}
        />
    );
};

const SettingsRow = (props: { formField: FormField }) => {
    const { formField } = props;

    return (
        <tr>
            <td>
                <input
                    type="text"
                    defaultValue={formField.name}
                    onBlur={(e) => {
                        updateFormField(formField.id, {
                            ...formField,
                            name: e.target.value,
                        });
                        window.location.reload();
                    }}
                    className="input input-primary input-bordered"
                />
            </td>

            <td>
                <input
                    type="text"
                    defaultValue={formField.regex}
                    onBlur={(e) => {
                        updateFormField(formField.id, {
                            ...formField,
                            regex: e.target.value,
                        });
                        window.location.reload();
                    }}
                    className="input input-primary input-bordered"
                />
            </td>
            <td>
                <select
                    className="select select-bordered"
                    onChange={(e) => {
                        updateFormField(formField.id, {
                            ...formField,
                            fieldType: e.target.value as FormFieldType,
                        });
                        window.location.reload();
                    }}
                >
                    {FormFieldTypes.map((fieldType) => {
                        return (
                            <option
                                value={fieldType}
                                selected={fieldType == formField.fieldType}
                            >
                                {fieldType}
                            </option>
                        );
                    })}
                </select>
            </td>
            <td>
                {formField.fieldType == "text" ||
                formField.fieldType == "select" ? (
                    <UpdateFormTextValue formField={formField} />
                ) : formField.fieldType == "file" ? (
                    <UpdateFormFileValue formField={formField} />
                ) : (
                    <input type="radio" name="" id="" />
                )}
            </td>
        </tr>
    );
};

const SettingsComponent = () => {
    const [currFields, setCurrFields] = useState<FormField[]>([]);

    useEffect(() => {
        getFormFields().then((fields: FormField[]) => {
            setCurrFields(fields);
        });
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-4xl">Settings</h1>
            <button className="btn btn-primary mt-4" onClick={createFormField}>
                Add a new Field
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>RegEx</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {currFields.map((formField: FormField) => {
                        return <SettingsRow formField={formField} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

loadReactComponent("settings", SettingsComponent);

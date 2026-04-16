import React from "react";
import Input from "@/components/form/input/InputField";

interface Props {
  fields: any[];
  formData: any;
  onChange: (e: any) => void;
  dynamicOptions?: Record<string, any[]>;
}

export default function DynamicForm({
  fields,
  formData,
  onChange,
  dynamicOptions = {},
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => {
        const fieldName =
          field.fieldName || field.name;

        const options =
          field.optionsKey
            ? dynamicOptions[
                field.optionsKey
              ] || []
            : [];

        return (
          <div key={fieldName}>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                name={fieldName}
                value={
                  formData[fieldName] || ""
                }
                onChange={onChange}
                className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select {field.label}
                </option>

                {options.map((opt) => (
                  <option
                    key={opt.id}
                    value={opt.id}
                  >
                    {opt.name}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                type={
                  field.type || "text"
                }
                name={fieldName}
                placeholder={`Enter ${field.label}`}
                defaultValue={
                  formData[fieldName]
                }
                onChange={onChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
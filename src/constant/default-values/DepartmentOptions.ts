import { Department } from "../enum/Department";

export const DepartmentOptions = Object.entries(Department).map(
  ([key, value]) => ({
    value: key,
    label: value,
  })
);

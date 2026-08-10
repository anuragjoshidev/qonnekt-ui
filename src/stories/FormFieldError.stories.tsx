import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormFieldError } from "../components/form/form-field-error";

const meta = {
  title: "Forms/FormFieldError",
  component: FormFieldError,
  tags: ["autodocs"],
} satisfies Meta<typeof FormFieldError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldName: "email",
    errors: { email: ["Email is required", "Must be a valid email"] },
  },
};

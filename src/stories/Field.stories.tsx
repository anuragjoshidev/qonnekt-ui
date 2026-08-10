import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../components/field";
import { Input } from "../components/input";

const meta = {
  title: "Forms/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" placeholder="Ada Lovelace" />
          <FieldDescription>Your display name.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

import React from "react";
import { CheckBox } from "components";
import { Meta, Story } from "@storybook/react";

export default {
  title: "dhiwise_react_web_app/CheckBox",
  component: CheckBox,
};

export const SampleCheckbox: Story<any> = (args) => <CheckBox {...args} />;

SampleCheckbox.args = { label: "Checkbox", inputClassName: "mr-1" };

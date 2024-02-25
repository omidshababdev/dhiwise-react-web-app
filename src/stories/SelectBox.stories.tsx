import React from "react";
import { Meta, Story } from "@storybook/react";
import { SelectBox } from "components";

export default {
  title: "dhiwise_react_web_app/SelectBox",
  component: SelectBox,
  argTypes: {
    options: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
};

export const SampleSelectbox: Story<any> = (args) => <SelectBox {...args} />;

SampleSelectbox.args = { placeholder: "Select", className: "w-[300px]" };

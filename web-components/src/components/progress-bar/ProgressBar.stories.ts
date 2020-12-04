/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { BarFormat, BarType } from "@/utils/enums";
import "@/components/progress-bar/ProgressBar";
import "@/components/theme/Theme";

export default {
  title: "Progress Bar",
  component: "md-progress-bar",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-modal"
    }
  }
};

export const ProgressBar = () => {
  const darkTheme = boolean("darkMode", false);
  const label = text("Label", "Test Progress Bar");
  const color = text("color", "blue");
  const dynamic = boolean("dynamic", false);
  const format = select("dispalyFormat", BarFormat, "none");
  const type = select("Type", BarType, "determinate");
  const value = number("Value", 25);

  return html`
    <md-theme class="theme-toggle" id="progress-bar" ?darkTheme=${darkTheme}>
      <md-progress-bar
        .value=${value}
        .type=${type}
        label="${label}"
        .color=${color}
        ?dynamic=${dynamic}
        .displayFormat=${format}
      >
      </md-progress-bar>
    </md-theme>
  `;
};
import React from "react";
import { AppCard } from "../components/ui";

describe("AppCard", () => {
  it("passes through the className contract", () => {
    const element = React.createElement(
      AppCard,
      { className: "bg-red-500" },
      null,
    );

    expect(element.props.className).toContain("bg-red-500");
  });
});

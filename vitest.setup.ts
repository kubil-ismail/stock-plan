import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// next/image butuh runtime Next. Di unit test cukup render <img> biasa.
vi.mock("next/image", async () => {
  const React = await import("react");
  return {
    default: ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      priority,
      ...props
    }: Record<string, unknown>) => React.createElement("img", props),
  };
});

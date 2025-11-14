import { inngest } from "./client";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import * as Sentry from "@sentry/nextjs";
const deepSeek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s");
    Sentry.logger.info("User triggered test log", {
      log_source: "sentry_test",
    });
    console.warn("有些东西不见了");
    console.error("这是我想追踪的错误");

    const { steps } = await step.ai.wrap(
      "deepseek-generate-text",
      generateText,
      {
        system: "你是一个乐于助人的助手.",
        prompt: "写一份四人素食千层面食谱.",
        model: deepSeek("deepseek-chat"),
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );
    return steps;
  },
);

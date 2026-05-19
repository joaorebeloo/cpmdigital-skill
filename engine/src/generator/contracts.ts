import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ElementSnapshot, MotionRaw, Tokens } from "../types.js";
import { generateBlueprint, generateDesignSystem, generateMotion, generatePromptCodex, generateVoice } from "./markdown.js";

async function writeJson(filePath: string, data: unknown): Promise<void> {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function writeContracts(outDir: string, sourceUrl: string, elements: ElementSnapshot[], motion: MotionRaw, tokens: Tokens): Promise<void> {
  await mkdir(outDir, { recursive: true });

  await writeJson(path.join(outDir, "raw-elements.json"), elements);
  await writeJson(path.join(outDir, "computed-styles.json"), elements);
  await writeJson(path.join(outDir, "motion-raw.json"), motion);
  await writeJson(path.join(outDir, "tokens.json"), tokens);

  await writeFile(path.join(outDir, "BLUEPRINT.md"), generateBlueprint(tokens, elements), "utf8");
  await writeFile(path.join(outDir, "design-system.md"), generateDesignSystem(tokens), "utf8");
  await writeFile(path.join(outDir, "voice.md"), generateVoice(elements), "utf8");
  await writeFile(path.join(outDir, "motion.md"), generateMotion(tokens, motion), "utf8");
  await writeFile(path.join(outDir, "PROMPT_CODEX.md"), generatePromptCodex(tokens), "utf8");

  await writeFile(
    path.join(outDir, "README.md"),
    `# Visual contract\n\nSource: ${sourceUrl}\n\nGenerated files:\n\n- screenshots/\n- raw-elements.json\n- computed-styles.json\n- motion-raw.json\n- tokens.json\n- BLUEPRINT.md\n- design-system.md\n- voice.md\n- motion.md\n- PROMPT_CODEX.md\n`,
    "utf8"
  );
}

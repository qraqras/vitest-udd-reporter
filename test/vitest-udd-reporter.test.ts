import { afterEach, describe, expect, test, vi } from "vitest";
import type { TestRunEndReason } from "vitest/reporters";
import { getMessage } from "../src/vitest-udd-messages";
import VitestUddReporter, {
	type VitestUddReporterOptions,
} from "../src/vitest-udd-reporter";

const REASONS = ["passed", "failed", "interrupted"] as const;
const OPTIONS = [{}, { useBanner: true }, { useBanner: false }] as const;
const CASES = REASONS.flatMap((r) => OPTIONS.map((o) => [r, o] as const));

/* biome-ignore lint: remove ANSI escape codes to stabilize snapshots across environments */
const stripAnsi = (s: string): string => s.replace(/\x1b\[[0-9;]*m/g, "");
const normalizeLogCalls = (calls: unknown[][]) =>
	calls.map((args) =>
		args.map((a) => (typeof a === "string" ? stripAnsi(a) : a)),
	);

const createReporter = (opts?: VitestUddReporterOptions) => {
	const uddReporter = new VitestUddReporter(opts);
	const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
	return { uddReporter, logSpy };
};

afterEach(() => {
	vi.restoreAllMocks();
});

describe("message management", () => {
	test.each(CASES)(
		"onTestRunEnd sets reporter.message for %s (useBanner=%s)",
		async (reason: TestRunEndReason, option: VitestUddReporterOptions) => {
			const { uddReporter } = createReporter(option);
			const expected = getMessage(
				reason as TestRunEndReason,
				option.useBanner ?? true,
			);
			await uddReporter.onTestRunEnd([], [], reason as TestRunEndReason);
			expect(uddReporter.message).toBe(expected);
		},
	);
});

describe("console output snapshots", () => {
	test.each(CASES)(
		"%s message with useBanner=%s",
		async (reason: TestRunEndReason, option: VitestUddReporterOptions) => {
			const { uddReporter, logSpy } = createReporter(option);
			await uddReporter.onTestRunEnd([], [], reason);
			await uddReporter.onFinished([], []);
			expect(normalizeLogCalls(logSpy.mock.calls)).toMatchSnapshot();
		},
	);
});

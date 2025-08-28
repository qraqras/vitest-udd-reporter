import { afterEach, describe, expect, test, vi } from "vitest";
import { getUddMessages } from "../src/vitest-udd-messages";
import VitestUddReporter from "../src/vitest-udd-reporter";

afterEach(() => {
	vi.restoreAllMocks();
});

const createReporter = (
	opts?: ConstructorParameters<typeof VitestUddReporter>[0],
) => {
	const uddReporter = new VitestUddReporter(opts);
	const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
	return { uddReporter, logSpy };
};

test("onTestRunEnd sets passed message and onFinished logs it and clears message", async () => {
	const { uddReporter, logSpy } = createReporter();

	await uddReporter.onTestRunEnd([], [], "passed");
	await uddReporter.onFinished([], []);

	expect(logSpy).toHaveBeenCalledWith(uddReporter.PASSED_MESSAGE);
	expect(uddReporter.message).toBe("");
});

test.each(["failed", "interrupted"] as const)(
	'onTestRunEnd("%s") sets failed message and onFinished logs it',
	async (reason) => {
		const { uddReporter, logSpy } = createReporter();

		await uddReporter.onTestRunEnd([], [], reason);
		await uddReporter.onFinished([], []);

		expect(logSpy).toHaveBeenCalledWith(uddReporter.FAILED_MESSAGE);
		expect(uddReporter.message).toBe("");
	},
);

test("constructor respects useBanner option", () => {
	const defaultReporter = new VitestUddReporter();
	const noBannerReporter = new VitestUddReporter({ useBanner: false });

	const defaultMsgs = getUddMessages(true);
	const noBannerMsgs = getUddMessages(false);

	expect(defaultReporter.PASSED_MESSAGE).toBe(defaultMsgs.PASSED_MESSAGE);
	expect(defaultReporter.FAILED_MESSAGE).toBe(defaultMsgs.FAILED_MESSAGE);

	expect(noBannerReporter.PASSED_MESSAGE).toBe(noBannerMsgs.PASSED_MESSAGE);
	expect(noBannerReporter.FAILED_MESSAGE).toBe(noBannerMsgs.FAILED_MESSAGE);
});

// --- Grouped snapshot tests for console output ---
describe("console output snapshots", () => {
	test("passed message with banner", async () => {
		const { uddReporter, logSpy } = createReporter();

		await uddReporter.onTestRunEnd([], [], "passed");
		await uddReporter.onFinished([], []);

		expect(logSpy.mock.calls).toMatchSnapshot();
	});
	test("passed message without banner", async () => {
		const { uddReporter, logSpy } = createReporter({ useBanner: false });

		await uddReporter.onTestRunEnd([], [], "passed");
		await uddReporter.onFinished([], []);

		expect(logSpy.mock.calls).toMatchSnapshot();
	});

	test.each(["failed", "interrupted"] as const)(
		"%s message with banner",
		async (reason) => {
			const { uddReporter, logSpy } = createReporter();

			await uddReporter.onTestRunEnd([], [], reason);
			await uddReporter.onFinished([], []);

			expect(logSpy.mock.calls).toMatchSnapshot();
		},
	);

	test.each(["failed", "interrupted"] as const)(
		"%s message without banner",
		async (reason) => {
			const { uddReporter, logSpy } = createReporter({ useBanner: false });

			await uddReporter.onTestRunEnd([], [], reason);
			await uddReporter.onFinished([], []);

			expect(logSpy.mock.calls).toMatchSnapshot();
		},
	);

	test("no message set (empty string)", async () => {
		const { uddReporter, logSpy } = createReporter();

		// Call onFinished without setting a message first
		await uddReporter.onFinished([], []);

		expect(logSpy.mock.calls).toMatchSnapshot();
	});
});

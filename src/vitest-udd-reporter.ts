import type { File } from "@vitest/runner";
import type { Reporter, SerializedError, TestModule } from "vitest/node";
import type { TestRunEndReason } from "vitest/reporters";
import { getUddMessages } from "./vitest-udd-messages.js";

interface VitestUddReporterOptions {
	useBanner?: boolean;
}

export default class VitestUddReporter implements Reporter {
	readonly PASSED_MESSAGE: string;
	readonly FAILED_MESSAGE: string;
	message: string;

	constructor(options?: VitestUddReporterOptions) {
		const useBanner = options?.useBanner ?? true;
		const { PASSED_MESSAGE, FAILED_MESSAGE } = getUddMessages(useBanner);
		this.PASSED_MESSAGE = PASSED_MESSAGE;
		this.FAILED_MESSAGE = FAILED_MESSAGE;
		this.message = "";
	}

	async onTestRunEnd(
		_testModules: ReadonlyArray<TestModule>,
		_unhandledErrors: ReadonlyArray<SerializedError>,
		reason: TestRunEndReason,
	) {
		const assertNever = (x: never): never => {
			throw new Error(`Unhandled TestRunEndReason: ${String(x)}`);
		};
		switch (reason) {
			case "passed":
				this.message = this.PASSED_MESSAGE;
				break;
			case "interrupted":
				this.message = this.FAILED_MESSAGE;
				break;
			case "failed":
				this.message = this.FAILED_MESSAGE;
				break;
			default:
				assertNever(reason);
				break;
		}
	}

	async onFinished(_files: File[], _errors: unknown[], _coverage?: unknown) {
		try {
			console.log(this.message);
		} finally {
			this.message = "";
		}
	}
}

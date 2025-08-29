import type { File } from "@vitest/runner";
import type { Reporter, SerializedError, TestModule } from "vitest/node";
import type { TestRunEndReason } from "vitest/reporters";
import { getMessage } from "./vitest-udd-messages.js";

export interface VitestUddReporterOptions {
	useBanner?: boolean;
}

export default class VitestUddReporter implements Reporter {
	useBanner: boolean;
	message: string;

	constructor(options?: VitestUddReporterOptions) {
		this.useBanner = options?.useBanner ?? true;
		this.message = "";
	}

	async onTestRunEnd(
		_testModules: ReadonlyArray<TestModule>,
		_unhandledErrors: ReadonlyArray<SerializedError>,
		reason: TestRunEndReason,
	) {
		this.message = getMessage(reason, this.useBanner);
	}

	async onFinished(_files: File[], _errors: unknown[], _coverage?: unknown) {
		try {
			console.log(this.message);
		} finally {
			this.message = "";
		}
	}
}

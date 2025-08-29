import type { TestRunEndReason } from "vitest/reporters";

const PASSED_MESSAGE_LINES: string[] = [
	"ユニコォォォーーン！",
	"", // blank line
];
const PASSED_MESSAGE_LINES_BANNER: string[] = [
	"⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀",
	"⡀⡀⣤⣤⣤⣤⡀⡀⡀⡀⡀⣤⣤⣤⣤⣤⡀⡀⡀⣤⣤⣤⣤⣤⣤⡀⡀⡀⡀⡀⡀⣤⡀⡀⡀⡀⡀⡀⡀⡀⣤⡀⡀⡀⡀⡀⡀⡀⡀⣤⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⣤⣄⡀⡀⡀⡀⡀⡀⡀⡀⡀⣶⡀⡀⡀⡀",
	"⡀⡀⡀⡀⡀⣿⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⣿⡀⡀⡀⣤⣤⣤⣿⣤⣤⡀⡀⡀⣤⣤⣤⣿⣤⣤⡀⡀⡀⣤⣤⣤⣿⣤⣤⡀⡀⣤⣤⣤⣤⣤⣤⣤⣤⡀⣤⣤⣤⣤⣤⣤⣤⣤⡀⡀⡀⡉⡀⡀⡀⣴⡆⡀⡀⡀⡀⣿⡀⡀⡀⡀",
	"⡀⡀⡀⡀⡀⣿⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⣿⡀⡀⡀⡀⣠⡾⣿⡀⡀⡀⡀⡀⡀⣠⡾⣿⡀⡀⡀⡀⡀⡀⣠⡾⣿⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⣀⣾⡋⡀⡀⡀⡀⡀⡛⡀⡀⡀⡀",
	"⡀⡛⡛⡛⡛⡛⡛⡛⡃⡀⡛⡛⡛⡛⡛⡛⡛⡀⡀⡛⡛⡛⡛⡛⡿⡀⡀⡀⡶⡋⣀⡿⡀⡀⡀⡀⡀⡶⡋⣀⡿⡀⡀⡀⡀⡀⡾⡋⣀⡿⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⣶⡶⡿⡋⡀⡀⡀⡀⡀⡀⡀⣶⡀⡀⡀⡀",
	"⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀",
	"", // blank line
];
const INTERRUPTED_MESSAGE_LINES: string[] = [
	"", // blank line
];
const INTERRUPTED_MESSAGE_LINES_BANNER: string[] = [
	"", // blank line
];
const FAILED_MESSAGE_LINES: string[] = [
	"それでも！",
	"", // blank line
];
const FAILED_MESSAGE_LINES_BANNER: string[] = [
	"⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⣠⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⣠⡄⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀",
	"⡀⡀⡘⡛⣩⡿⡉⡀⡀⡀⡀⣸⡀⡀⣀⡀⡀⡀⡀⣤⣤⣤⣴⡶⡶⡛⡀⡀⣀⣀⣸⣀⡀⡀⡀⡀⡀⡀⡀⡰⡶⡀⡀⡀⡀",
	"⡀⣀⣠⣞⣥⣤⣤⡶⡀⡀⡋⣹⣴⡋⡀⡇⡀⡀⡀⡀⡀⣰⡋⡀⣌⡳⡀⡀⡀⡀⣿⡀⡀⡀⡀⡀⡀⡀⡀⡀⡇⡀⡀⡀⡀",
	"⡀⡉⡀⣠⡏⡀⡀⡀⡀⡀⣠⣻⡀⡀⡀⡇⡀⡀⡀⡀⡀⣿⡀⡀⡀⡀⡀⡀⡉⡉⡟⡉⡁⣸⡀⡀⡀⡀⡀⡀⡃⡀⡀⡀⡀",
	"⡀⡀⡀⡸⣦⣀⣀⡀⡀⡘⡁⣸⡀⡀⡀⣧⡾⡁⡀⡀⡀⡈⣷⣤⣄⡀⡀⡀⡀⡀⣷⣀⣀⣸⡀⡀⡀⡀⡀⡰⡶⡀⡀⡀⡀",
	"⡀⡀⡀⡀⡀⡉⡁⡀⡀⡀⡀⡈⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡉⡉⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀⡀",
	"", // blank line
];

type color = "green" | "yellow" | "red" | "none";
const colorize = (text: string, color: color): string => {
	const colors: Record<string, { start: string; end: string }> = {
		green: { start: "\x1b[32m", end: "\x1b[0m" },
		yellow: { start: "\x1b[33m", end: "\x1b[0m" },
		red: { start: "\x1b[31m", end: "\x1b[0m" },
		none: { start: "", end: "" },
	};
	return `${colors[color].start}${text}${colors[color].end}`;
};

export const getMessage = (
	reason: TestRunEndReason,
	useBanner: boolean,
): string => {
	let color: color = "none";
	let lines: string[] = [];
	const assertUnhandledReason = (x: never): never => {
		throw new Error(`Unhandled TestRunEndReason: ${String(x)}`);
	};
	switch (reason) {
		case "passed":
			color = "green";
			lines = useBanner ? PASSED_MESSAGE_LINES_BANNER : PASSED_MESSAGE_LINES;
			break;
		case "interrupted":
			color = "yellow";
			lines = useBanner
				? INTERRUPTED_MESSAGE_LINES_BANNER
				: INTERRUPTED_MESSAGE_LINES;
			break;
		case "failed":
			color = "red";
			lines = useBanner ? FAILED_MESSAGE_LINES_BANNER : FAILED_MESSAGE_LINES;
			break;
		default:
			assertUnhandledReason(reason);
			break;
	}
	return colorize(lines.join("\n"), color);
};

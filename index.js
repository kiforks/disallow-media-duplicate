const stylelint = require("stylelint");

const { report, validateOptions, ruleMessages } = stylelint.utils;
const ruleName = "kiforks/disallow-media-duplicate";
const messages = ruleMessages(ruleName, {
	expected: (value) => `Duplicated media query '${value}'.`,
});

module.exports = stylelint.createPlugin(ruleName, (enabled) => {
	if (!enabled) {
		return;
	}
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				// No options for now...
			}
		);

		if (!validOptions) {
			return;
		}

		root.walkAtRules('include', atRule => {
			if (!atRule) {
				return;
			}

			const { params } = atRule;

			if (typeof params !== 'string') {
				return;
			}

			const isMediaMixin = params.includes('media');

			if (!isMediaMixin) {
				return;
			}

			const findDuplicates = (array) => {
				const sorted_arr = array.slice().sort();
				const results = [];

				for (let i = 0; i < sorted_arr.length - 1; i++) {
					if (sorted_arr[i + 1] == sorted_arr[i]) {
						results.push(sorted_arr[i]);
					}
				}
				return results;
			}

			const nodes = atRule.parent.nodes.map(node => node.params);;
			const duplicateNodes = findDuplicates(nodes);

			if (!duplicateNodes.length) {
				return;
			}

			const duplicateValues = [...new Set(duplicateNodes)];

			duplicateValues.forEach(duplicateValue => {
				if (atRule.params !== duplicateValue) {
					return;
				}

				report({
					result,
					ruleName,
					message: messages.expected(duplicateValue),
					node: atRule,
					word: atRule.value
				});
			})
		})
	}
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;

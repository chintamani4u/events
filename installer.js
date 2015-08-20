//installer.js for global installs through package.json

require('package-script').spawn([
	{
		command: "npm",
		args: ["install", "-g", "grunt-cli"]
	},
	{
		command: "npm",
		args: ["install", "-g", "bower"]
	}

	]);
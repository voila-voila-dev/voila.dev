import { Command } from "commander";

const program = new Command();

program
	.name("trigger-deployment")
	.description("Trigger a compose deployment via Dokploy API")
	.requiredOption("--api-key <key>", "API key for authentication")
	.requiredOption("--compose-id <id>", "Compose ID to deploy")
	.action(async (options) => {
		try {
			const response = await fetch(
				"https://cloud.voila.dev/api/trpc/compose.deploy",
				{
					method: "POST",
					headers: {
						accept: "application/json",
						"x-api-key": options.apiKey,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						json: {
							composeId: options.composeId,
						},
					}),
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				console.error(
					`Deployment failed: ${response.status} ${response.statusText}`,
				);
				console.error(errorText);
				process.exit(1);
			}

			const data = await response.json();
			console.log("Deployment triggered successfully");
			console.log(JSON.stringify(data, null, 2));
		} catch (error) {
			console.error("Failed to trigger deployment:", error);
			process.exit(1);
		}
	});

program.parse();

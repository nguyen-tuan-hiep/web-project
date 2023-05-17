import { client } from "@gradio/client";


async function run() {

	const app = await client("http://127.0.0.1:7860");
	const result = await app.predict("/predict", [
				"When do I have to check in  the cozy studio apartment?",
	]);

	console.log(result?.data);
}

run();
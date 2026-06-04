import { getCloudflareContext } from "@opennextjs/cloudflare";

type DinnerTabsEnv = CloudflareEnv & {
	DB?: D1Database;
	CACHE?: KVNamespace;
};

export async function getDinnerTabsEnv(): Promise<DinnerTabsEnv | null> {
	try {
		const context = await getCloudflareContext({ async: true });
		return context.env as DinnerTabsEnv;
	} catch {
		return null;
	}
}

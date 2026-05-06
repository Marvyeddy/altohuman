const DEFAULT_BACKEND_API_URL =
  "https://humped-footwork-dividing.ngrok-free.dev";

export const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") || DEFAULT_BACKEND_API_URL;

export const NGROK_SKIP_BROWSER_WARNING_HEADER = {
  "ngrok-skip-browser-warning": "true",
} as const;

export type BackendPayment = {
  amount: number;
};

export type BackendUserData = {
  credit?: number;
  wordLimit?: number;
  currentPlan?: string;
  payments?: BackendPayment[];
} | null;

export function backendApiUrl(path: string) {
  return `${BACKEND_API_URL}/${path.replace(/^\//, "")}`;
}

export async function readApiError(
  response: Response,
  fallback = "Request failed",
) {
  try {
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return data.detail || data.error || data.message || fallback;
    }

    const text = await response.text();
    return text || fallback;
  } catch {
    return fallback;
  }
}

export async function getCurrentUserData(
  cookieHeader: string,
): Promise<BackendUserData> {
  try {
    const response = await fetch(backendApiUrl("/api/v1/user/me"), {
      headers: {
        cookie: cookieHeader,
        ...NGROK_SKIP_BROWSER_WARNING_HEADER,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to load current user data: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to connect to backend user endpoint:", error);
    return null;
  }
}

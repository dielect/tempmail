import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const BASE_URL = "https://web2.temp-mail.org";
const DEFAULT_HEADERS = {
    "User-Agent": "PostmanRuntime/7.51.1",
    "Content-Length": "0",
    "Cache-Control": "no-cache",
};

/**
 * Get proxy agent from environment variables.
 * Supports https_proxy / HTTPS_PROXY / http_proxy / HTTP_PROXY
 */
let proxyLogged = false;

function getProxyAgent(): HttpsProxyAgent<string> | undefined {
    const proxy =
        process.env.https_proxy ||
        process.env.HTTPS_PROXY ||
        process.env.http_proxy ||
        process.env.HTTP_PROXY;
    if (proxy) {
        if (!proxyLogged) {
            console.log(`[tempmail] Using proxy: ${proxy}`);
            proxyLogged = true;
        }
        return new HttpsProxyAgent(proxy);
    }
    return undefined;
}

export interface Mailbox {
    token: string;
    mailbox: string;
}

export interface Message {
    _id: string;
    receivedAt: number;
    from: string;
    subject: string;
    bodyPreview: string;
    attachmentsCount: number;
}

/**
 * Create a temporary mailbox
 * @returns Mailbox info containing token and email address
 * @example
 * ```ts
 * const mailbox = await createMailbox();
 * console.log(mailbox);
 * // {
 * //   token: "eyJhbGciOiJIUzI1NiIs...",
 * //   mailbox: "abc123@esyline.com"
 * // }
 * ```
 */
export async function createMailbox(): Promise<Mailbox> {
    const { data } = await axios.request<Mailbox>({
        method: "POST",
        url: `${BASE_URL}/mailbox`,
        headers: DEFAULT_HEADERS,
        httpAgent: getProxyAgent(),
        httpsAgent: getProxyAgent(),
    });
    return data;
}

/**
 * Get messages for a mailbox
 * @param token - The token returned from createMailbox
 * @returns List of messages
 * @example
 * ```ts
 * const messages = await getMessages(token);
 * console.log(messages);
 * // [
 * //   {
 * //     _id: "67a1b2c3d4e5f6a7b8c9d0e1",
 * //     receivedAt: 1771499866,
 * //     from: "John Doe <johndoe@outlook.com>",
 * //     subject: "Hello",
 * //     bodyPreview: "This is a test email...",
 * //     attachmentsCount: 0
 * //   }
 * // ]
 * ```
 */
export async function getMessages(token: string): Promise<Message[]> {
    const { data } = await axios.request<{ mailbox: string; messages: Message[] }>({
        method: "GET",
        url: `${BASE_URL}/messages`,
        headers: {
            ...DEFAULT_HEADERS,
            Authorization: `Bearer ${token}`,
        },
        httpAgent: getProxyAgent(),
        httpsAgent: getProxyAgent(),
    });
    return data.messages;
}

/**
 * TempMail client class with automatic token management
 */
export class TempMail {
    private token: string | null = null;
    public mailbox: string | null = null;

    /**
     * Create a mailbox and store the token
     */
    async create(): Promise<Mailbox> {
        const result = await createMailbox();
        this.token = result.token;
        this.mailbox = result.mailbox;
        return result;
    }

    /**
     * Get messages for the current mailbox
     */
    async getMessages(): Promise<Message[]> {
        if (!this.token) {
            throw new Error("Mailbox not created yet. Call create() first.");
        }
        return getMessages(this.token);
    }
}

export default TempMail;

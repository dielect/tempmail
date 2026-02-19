import axios from "axios";

const BASE_URL = "https://web2.temp-mail.org";
const DEFAULT_HEADERS = {
    "User-Agent": "PostmanRuntime/7.51.1",
    "Content-Length": "0",
    "Cache-Control": "no-cache",
};

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
 * 创建临时邮箱
 * @returns 邮箱信息，包含 token 和邮箱地址
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
    });
    return data;
}

/**
 * 获取邮件列表
 * @param token - 创建邮箱时返回的 token
 * @returns 邮件列表
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
    });
    return data.messages;
}

/**
 * TempMail 客户端类，自动管理 token
 */
export class TempMail {
    private token: string | null = null;
    public mailbox: string | null = null;

    /**
     * 创建邮箱并保存 token
     */
    async create(): Promise<Mailbox> {
        const result = await createMailbox();
        this.token = result.token;
        this.mailbox = result.mailbox;
        return result;
    }

    /**
     * 获取当前邮箱的邮件
     */
    async getMessages(): Promise<Message[]> {
        if (!this.token) {
            throw new Error("请先调用 create() 创建邮箱");
        }
        return getMessages(this.token);
    }
}

export default TempMail;

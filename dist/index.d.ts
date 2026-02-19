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
export declare function createMailbox(): Promise<Mailbox>;
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
export declare function getMessages(token: string): Promise<Message[]>;
/**
 * TempMail 客户端类，自动管理 token
 */
export declare class TempMail {
    private token;
    mailbox: string | null;
    /**
     * 创建邮箱并保存 token
     */
    create(): Promise<Mailbox>;
    /**
     * 获取当前邮箱的邮件
     */
    getMessages(): Promise<Message[]>;
}
export default TempMail;

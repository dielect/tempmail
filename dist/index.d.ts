export interface Mailbox {
    token: string;
    mailbox: string;
}
export interface Message {
    id: string;
    from: string;
    to: string;
    subject: string;
    body_text: string;
    body_html: string;
    created_at: string;
    attachments: unknown[];
}
/**
 * 创建临时邮箱
 * @returns 邮箱信息，包含 token 和邮箱地址
 */
export declare function createMailbox(): Promise<Mailbox>;
/**
 * 获取邮件列表
 * @param token - 创建邮箱时返回的 token
 * @returns 邮件列表
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

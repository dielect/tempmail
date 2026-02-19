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
export declare function createMailbox(): Promise<Mailbox>;
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
export declare function getMessages(token: string): Promise<Message[]>;
/**
 * TempMail client class with automatic token management
 */
export declare class TempMail {
    private token;
    mailbox: string | null;
    /**
     * Create a mailbox and store the token
     */
    create(): Promise<Mailbox>;
    /**
     * Get messages for the current mailbox
     */
    getMessages(): Promise<Message[]>;
}
export default TempMail;

// 使用示例
import { TempMail } from "./src/index";

const mail = new TempMail();

// 创建邮箱
const { token, mailbox } = await mail.create();
console.log("邮箱地址:", mailbox);
console.log("Token:", token);

// 获取邮件
const messages = await mail.getMessages();
console.log("邮件列表:", messages);

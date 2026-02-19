# tempmail-sdk

Temp-mail.org SDK，提供创建临时邮箱和获取邮件的功能。

## 安装

```bash
# 从 GitHub 安装
bun add github:dielect/tempmail

# 或者用 npm
npm install github:dielect/tempmail
```

## 使用

### 类方式（推荐）

```ts
import { TempMail } from "tempmail-sdk";

const mail = new TempMail();

// 创建临时邮箱
const { token, mailbox } = await mail.create();
console.log("邮箱地址:", mailbox);

// 获取邮件列表
const messages = await mail.getMessages();
console.log(messages);
```

### 函数方式

```ts
import { createMailbox, getMessages } from "tempmail-sdk";

// 创建邮箱
const { token, mailbox } = await createMailbox();

// 用 token 获取邮件
const messages = await getMessages(token);
```

## API

### `createMailbox(): Promise<Mailbox>`

创建一个临时邮箱，返回 `{ token, mailbox }`。

### `getMessages(token: string): Promise<Message[]>`

根据 token 获取邮件列表。

### `TempMail` 类

- `create()` - 创建邮箱并自动保存 token
- `getMessages()` - 获取当前邮箱的邮件
- `mailbox` - 当前邮箱地址

## License

MIT

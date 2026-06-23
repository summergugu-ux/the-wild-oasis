import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8.8rem); /* 减去 Header 高度 */
  margin: -4rem -4.8rem -6.4rem; /* 抵消 Main 的 padding */
  background: var(--color-grey-0);
`;

const Header = styled.div`
  padding: 2rem 3.2rem;
  border-bottom: 1px solid var(--color-grey-200);
  background: var(--color-grey-0);
  display: flex;
  align-items: center;
  gap: 1.2rem;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-grey-800);
    margin: 0;
  }

  span.subtitle {
    font-size: 1.3rem;
    color: var(--color-grey-500);
    margin-left: 0.4rem;
  }
`;

const HeaderIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: var(--color-brand-600);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  background: var(--color-grey-50);
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-400);
  gap: 1.2rem;
  font-size: 1.5rem;

  span.icon {
    font-size: 4rem;
  }
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${(p) => (p.role === "user" ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div`
  max-width: 65%;
  padding: 1.2rem 1.6rem;
  border-radius: ${(p) =>
    p.role === "user"
      ? "1.6rem 1.6rem 0.4rem 1.6rem"
      : "1.6rem 1.6rem 1.6rem 0.4rem"};
  font-size: 1.4rem;
  line-height: 1.7;
  word-break: break-word;
  background: ${(p) =>
    p.role === "user" ? "var(--color-brand-600)" : "var(--color-grey-0)"};
  color: ${(p) => (p.role === "user" ? "white" : "var(--color-grey-700)")};
  border: ${(p) =>
    p.role === "assistant" ? "1px solid var(--color-grey-200)" : "none"};
  border-left: ${(p) =>
    p.role === "assistant" ? "3px solid var(--color-brand-600)" : "none"};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const InputArea = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 2rem 3.2rem;
  border-top: 1px solid var(--color-grey-200);
  background: var(--color-grey-0);
`;

const Input = styled.input`
  flex: 1;
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  background: var(--color-grey-50);
  color: var(--color-grey-700);
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    background: var(--color-grey-0);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const Button = styled.button`
  padding: 1.2rem 2.4rem;
  background: ${(p) =>
    p.disabled ? "var(--color-grey-300)" : "var(--color-brand-600)"};
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  font-weight: 500;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: var(--color-brand-700);
  }
`;

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const placeholderIndex = newMessages.length;
    setMessages([...newMessages, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(
        "https://api.deepseek.com/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            stream: true,
            messages: [
              {
                role: "system",
                content:
                  "你是The Wild Oasis酒店的AI助手，帮助工作人员解答关于酒店运营、客房管理、预订政策等问题。",
              },
              ...newMessages,
            ],
          }),
        },
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || "";
              if (content) {
                fullText += content;
                const currentText = fullText;
                setMessages((prev) =>
                  prev.map((msg, index) =>
                    index === placeholderIndex
                      ? { ...msg, content: currentText }
                      : msg,
                  ),
                );
              }
            } catch {
              // 跳过
            }
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.filter((_, index) => index !== placeholderIndex),
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <HeaderIcon>🌲</HeaderIcon>
        <div>
          <h2>AI 助手</h2>
        </div>
        <span className="subtitle">The Wild Oasis 智能客服</span>
      </Header>

      <MessageArea>
        {messages.length === 0 ? (
          <EmptyState>
            <span className="icon">🏕️</span>
            <span>有什么可以帮助你的？</span>
          </EmptyState>
        ) : (
          messages.map((msg, index) => (
            <MessageRow key={index} role={msg.role}>
              <MessageBubble role={msg.role}>
                {msg.content ||
                  (isLoading && index === messages.length - 1
                    ? "思考中..."
                    : "")}
              </MessageBubble>
            </MessageRow>
          ))
        )}
      </MessageArea>

      <InputArea>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="询问关于酒店的任何问题..."
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          {isLoading ? "..." : "发送"}
        </Button>
      </InputArea>
    </Container>
  );
}

export default AIAssistant;

"use client";

import { useEffect, useRef, useState } from "react";
import DVButton from "./Button";
import DVTextField from "./TextField";
import {
    Box,
    Typography,
    Collapse,
    Divider,
    CircularProgress,
    useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PestControlTwoToneIcon from '@mui/icons-material/PestControlTwoTone';
import { alpha } from '@mui/material/styles'

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
    model?: string;
};

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL || "http://localhost:3001/chat";

export default function DVAgentChat() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedSession = localStorage.getItem("agent_sessionId");
        if (savedSession) setSessionId(savedSession);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function sendMessage() {
        if (!input.trim() || loading) return;

        const userMessage: ChatMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.content, sessionId }),
            });

            const data = await response.json();

            if (data.sessionId && !sessionId) {
                setSessionId(data.sessionId);
                localStorage.setItem("agent_sessionId", data.sessionId);
            }

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply, model: data.model },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 1300,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}
        >
            {/* Chat Window */}
            <Collapse in={open} timeout={300}>
                <Box
                    sx={{
                        width: 340,
                        height: 600,
                        mb: 2,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            height: "auto",
                            // backgroundColor: alpha(theme.palette.background.paper, 0.15),
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            "&::-webkit-scrollbar": {
                                width: 2,

                            },
                            "&::-webkit-scrollbar-track": {
                                my: 1,
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: alpha(theme.palette.text.secondary, 0.3),
                            },
                        }}
                    ><Box sx={{ mt: "auto" }} />
                        {messages.length === 0 && (
                            <Box sx={{ textAlign: "center", my: 4 }}>
                                <PestControlTwoToneIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                                <Typography variant="body2" sx={{ backgroundColor: "primary.paper", color: "text.secondary", p: 1 }}>
                                    Ask me anything about DV!
                                </Typography>
                            </Box>
                        )}

                        {messages.map((msg, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: msg.role === "user" ? "flex-end" : "flex-start"
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 1,
                                        py: 0.75,
                                        borderRadius: msg.role === "user" ? "0" : "0",
                                        maxWidth: "90%",
                                        backgroundColor: msg.role === "user" ? "background.paper" : "rgb(0, 0, 0, 0.65)",
                                        color: msg.role === "user" ? "text.primary" : "white",
                                    }}
                                >
                                    <Typography variant="caption" sx={{ lineHeight: 1.6 }}>
                                        {msg.content}
                                    </Typography>
                                </Box>
                                {msg.role === "assistant" && msg.model && (
                                    <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, px: 0.5 }}>
                                        via {msg.model}
                                    </Typography>
                                )}
                            </Box>
                        ))}

                        {loading && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CircularProgress size={14} />
                                <Typography variant="caption" color="text.secondary">
                                    Thinking...
                                </Typography>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>
                    <Divider />
                    {/* Input */}
                    <Box sx={{ display: "flex", alignItems: "center", p: 0, height: "fit-content", backgroundColor: theme => theme.palette.background.paper, }}>
                        <DVTextField
                            size="small"
                            placeholder="Ask about DV..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                        />
                        <DVButton
                            customVariant="ghost"
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            size="small"
                        >
                            <SendIcon fontSize="small" />
                        </DVButton>
                    </Box>
                </Box>
            </Collapse>
            {/* FAB Button */}
            <DVButton
                customVariant="outline"
                onClick={() => setOpen((prev) => !prev)}
            >
                <PestControlTwoToneIcon sx={{ fontSize: 16 }} />
            </DVButton>
        </Box>
    );
}
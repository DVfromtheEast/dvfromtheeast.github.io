"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Divider, Link, Skeleton } from "@mui/material";
import matter from "gray-matter";

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";

type BioSection = {
    title: string;
    content: string;
};

type BioData = {
    name: string;
    role: string;
    location: string;
    sections: BioSection[];
};



function parseBio(raw: string): BioData {
    const { data, content } = matter(raw);

    // Split content by headings
    const sections: BioSection[] = [];
    const parts = content.split(/^# /m).filter(Boolean);

    for (const part of parts) {
        const lines = part.trim().split("\n");
        const title = lines[0].trim();
        const body = lines.slice(1).join("\n").trim();
        if (title && body) {
            sections.push({ title, content: body });
        }
    }

    return {
        name: data.name || "DV",
        role: data.role || "",
        location: data.location || "",
        sections,
    };
}

export default function Bio() {
    const [bio, setBio] = useState<BioData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBio() {
            try {
                const bioRes = await fetch(`${API_URL}/data/bio`);
                const bio = await bioRes.json();
                setBio(parseBio(bio.content));
            } catch (err) {
                console.error("Failed to fetch bio:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchBio();
    }, []);

    if (loading) {
        return (
            <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
                {[...Array(4)].map((_, i) => (
                    <Box key={i} sx={{ mb: 4 }}>
                        <Skeleton variant="text" width="30%" height={32} />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="90%" />
                    </Box>
                ))}
            </Box>
        );
    }

    if (!bio) return null;

    return (
        <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700}>
                    hi  {bio.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {bio.role} · {bio.location}
                </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Sections */}
            {bio.sections.map((section, i) => (
                <Box key={i} sx={{ mb: 4 }}>
                    <Typography variant="overline" color="text.secondary" fontWeight={600}>
                        {section.title}
                    </Typography>

                    {/* Render contact links differently */}
                    {section.title === "Get In Touch" ? (
                        <Box sx={{ mt: 1 }}>
                            {section.content.split("\n").map((line, j) => {
                                const match = line.match(/^- (.+): (.+)$/);
                                if (match) {
                                    return (
                                        <Typography key={j} variant="body2" sx={{ mt: 0.5 }}>
                                            {match[1]}:{" "}
                                            <Link href={match[2].startsWith("http") ? match[2] : `mailto:${match[2]}`} target="_blank">
                                                {match[2]}
                                            </Link>
                                        </Typography>
                                    );
                                }
                                return null;
                            })}
                        </Box>
                    ) : (
                        <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.8 }}>
                            {section.content}
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
}
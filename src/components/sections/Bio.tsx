"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Link, Skeleton } from "@mui/material";
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
            <Box sx={{ width: '70%', mx: "auto", px: 2 }}>
                {[...Array(4)].map((_, i) => (
                    <Box key={i} sx={{ mb: 4 }}>
                        <Skeleton variant="text" width="30%" height={32} />
                        <Skeleton variant="text" width="100%" />
                    </Box>
                ))}
            </Box>
        );
    }

    if (!bio) return null;

    return (
        <Box sx={{ width: '70%', mx: "auto", px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, py: 6 }}>
                {/* Title */}
                <Box sx={{ pl: 2, borderLeft: theme => `4px solid ${theme.palette.primary.main}` }}>
                    <Typography variant="h2" fontWeight={700}>
                        About {bio.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {bio.role}  •  {bio.location}
                    </Typography>
                </Box>
                {/* Sections */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'flex-start' }}>
                    <Box sx={{ py: 2, pr: 2 }}>
                        <Box className="profilepic" sx={{
                            position: 'relative', flexShrink: 0, cursor: 'pointer', width: '16rem', height: '32rem', color: 'text.primary', border: theme => `1px solid ${theme.palette.primary.main}`, '&:hover': {
                                border: 'none',
                            },
                        }}>
                            <Box className="profilepic_dec" sx={{
                                position: 'absolute', bottom: '-0.25rem', left: '-0.25rem', '&:hover': {
                                    bottom: '-1rem', left: '-1rem'
                                },
                            }}></Box>
                            <Box className="profilepic_dec" sx={{
                                position: 'absolute', top: '-0.25rem', right: '-0.25rem', '&:hover': {
                                    top: '-1rem', right: '-1rem'
                                },
                            }}></Box>
                        </Box>
                    </Box>
                    <Box >
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
                </Box>
            </Box>

        </Box >
    );
}
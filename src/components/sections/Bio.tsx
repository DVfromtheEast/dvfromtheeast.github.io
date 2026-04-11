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
                        <Box sx={{
                            position: 'relative', flexShrink: 0, cursor: 'pointer', width: '16rem', height: '32rem', background: 'linear-gradient(0deg, rgba(61, 178, 15, 0.5), rgba(61, 178, 15, 0.15))', border: theme => `1px solid ${theme.palette.primary.main}`, overflow: 'visible', transition: 'all 0.3s ease',
                            '&:hover': {
                                border: theme => `1px solid ${theme.palette.divider}`, m: '1rem'
                            },
                            '&:hover .pic-dec-bl': { bottom: '-1.5rem', left: '-1.5rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                            '&:hover .pic-dec-tr': { top: '-1.5rem', right: '-1.5rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                            '&:hover .profilepic': { mixBlendMode: 'normal' },

                        }}>
                            <Box component="img" className="profilepic" src="https://res.cloudinary.com/da7poid94/image/upload/v1774691466/DV_ugjlos.jpg" alt="DV" sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', mixBlendMode: 'luminosity', }} />
                            <Box className="pic-dec-bl" sx={{
                                position: 'absolute', width: '2rem', height: '3rem', bottom: '0.5rem', left: '0.5rem', borderLeft: 6, borderBottom: 6, borderColor: theme => ` ${theme.palette.primary.contrastText}`,
                                transition: 'all 0.3s ease',
                            }}></Box>
                            <Box className="pic-dec-tr" sx={{
                                position: 'absolute', width: '2rem', height: '3rem', top: '0.5rem', right: '0.5rem', borderRight: 6, borderTop: 6, borderColor: theme => ` ${theme.palette.primary.contrastText}`,
                                transition: 'all 0.3s ease',
                            }}></Box>
                        </Box>
                    </Box>
                    <Box >
                        {bio.sections.map((section, i) => (
                            <Box key={i} sx={{ mb: 4 }}>
                                <Typography variant="overline" color="text.secondary" fontWeight={600}>
                                    {section.title}
                                </Typography>
                                {section.title === "Get In Touch" ? (
                                    <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.8 }}>
                                        {section.content.split("reach out").map((part, i, arr) => (
                                            <>
                                                {part}
                                                {i < arr.length - 1 && (
                                                    <Link href="/contact" variant="subtitle1" sx={{ textDecoration: 'none', transition: 'all 0.15s ease-in', '&:hover': { filter: 'brightness(1.2)' } }}>
                                                        reach out
                                                    </Link>
                                                )}
                                            </>
                                        ))}
                                    </Typography>
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
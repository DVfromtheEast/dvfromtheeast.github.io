"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Chip, alpha } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type WorkItemProps = {
    categoryId: string | null;
    setActiveSection: (section: 'home' | 'about' | 'works' | 'work-item' | 'work-details' | 'abilities' | 'contact') => void;
    setActiveWorkId: (id: string) => void;
};

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";

type LocalizedString = {
    en: string;
    vi: string;
    de: string;
};

type ContentBlock =
    | { type: "media"; thumbnail: string; cover: string }
    | { type: "text"; value: LocalizedString }
    | { type: "image"; url: string; caption: LocalizedString };

type Work = {
    id: string;
    title: string[];
    description: LocalizedString;
    tech: string[];
    tags: string[];
    thumbnail: string;
    cover: string;
    content: ContentBlock[];
    links: {
        live: string | null;
        case_study: string | null;
    };
};

type Category = {
    id: string;
    label: LocalizedString;
    description: LocalizedString;
    thumbnail: string;
    works: Work[];
};

type WorksData = {
    categories: Category[];
};

function WorkCard({
    work,
    language,
    onClick,
}: {
    work: Work;
    language: string;
    onClick: (id: string) => void;
}) {
    const media = work.content.find(b => b.type === "media") as { type: "media"; thumbnail: string; cover: string } | undefined;

    return (
        <Box
            onClick={() => onClick(work.id)}
            sx={{
                width: 4 / 5, height: 'fit-content',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backdropFilter: "blur(4px)",
                backgroundColor: alpha("#906CD2", 0.3),
                overflow: "hidden",
                "&:hover": {
                    transform: "scale(0.97)",
                    border: theme => `1px solid ${theme.palette.primary.main}`,
                },
            }}
        >
            {/* Thumbnail */}
            <Box
                component="img"
                src={`${work.thumbnail}`}
                alt={`${work.title}`}
                sx={{ width: 'auto', height: "100%", objectFit: "cover", pointerEvents: "none", WebkitTouchCallout: "none" }}
            />

            {/* Info */}
            <Box sx={{
                w: 1,
                p: 4, display: "flex", flexDirection: "column", gap: 4
            }}>
                <Typography variant="h4">{work.title}</Typography>

                <Typography variant="body2" sx={{ maxWidth: '28rem', color: 'text.secondary' }}>{work.description[language]}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                    {work.tags.map(tag => (
                        <Chip key={tag} label={tag} size="medium" sx={{ textTransform: "uppercase" }} />
                    ))}
                </Box>

            </Box>
        </Box>
    );
}

export default function WorkItem({ categoryId, setActiveSection, setActiveWorkId }: WorkItemProps) {
    const { language } = useLanguage();
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWorks() {
            try {
                const res = await fetch(`${API_URL}/data/works`);
                const data: WorksData = await res.json();
                const found = data.categories.find(c => c.id === categoryId) || null;
                setCategory(found);
            } catch (err) {
                console.error("Failed to fetch works:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchWorks();
    }, [categoryId]);

    function handleWorkClick(id: string) {
        setActiveWorkId(id);
        setActiveSection("work-details");
    }

    if (loading) {
        return (
            <Box sx={{ width: "70%", mx: "auto", px: 2 }}>
                <Skeleton variant="text" width="30%" height={48} sx={{ mb: 4 }} />
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height="20rem" sx={{ borderRadius: 1 }} />
                    ))}
                </Box>
            </Box>
        );
    }

    if (!category) return null;

    return (
        <Box sx={{ width: "70%", mx: "auto", px: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 6, py: 6 }}>
                {/* Back button */}
                <Box
                    onClick={() => setActiveSection("works")}
                    sx={{
                        display: "flex", alignItems: "center", gap: 1,
                        cursor: "pointer", width: "fit-content",
                        color: "text.secondary",
                        transition: "all 0.15s ease",
                        "&:hover": { color: "primary.main" },
                    }}
                >
                    <ArrowBackIcon fontSize="small" />
                    <Typography variant="body2">Back</Typography>
                </Box>

                {/* Title */}
                <Box sx={{ pl: 2, borderLeft: theme => `4px solid ${theme.palette.primary.main}` }}>
                    <Typography variant="h2" fontWeight={700}>{category.label[language]}</Typography>
                    <Typography variant="body2" color="text.secondary">{category.description[language]}</Typography>
                </Box>

                {/* Work cards */}
                <Box sx={{ width: 1, display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 3 }}>
                    {category.works.map(work => (
                        <WorkCard
                            key={work.id}
                            work={work}
                            language={language}
                            onClick={handleWorkClick}
                        />
                    ))}
                </Box>
            </Box>
        </Box>);
}
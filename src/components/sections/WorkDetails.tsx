"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Chip, alpha } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type WorkDetailsProps = {
    categoryId: string | null;
    setActiveSection: (section: 'home' | 'about' | 'works' | 'work-details' | 'work-item' | 'abilities' | 'contact') => void;
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
    title: LocalizedString;
    description: LocalizedString;
    tech: string[];
    tags: string[];
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
                position: "relative",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backdropFilter: "blur(5px)",
                backgroundColor: alpha("#906CD2", 0.1),
                "&:hover": {
                    transform: "scale(0.97)",
                    filter: "brightness(1.2)",
                    border: theme => `1px solid ${theme.palette.primary.main}`,
                },
                "&:hover .pic-dec-bl": {
                    bottom: "-1rem",
                    left: "-1rem",
                    borderColor: theme => theme.palette.primary.main,
                },
                "&:hover .pic-dec-tr": {
                    top: "-1rem",
                    right: "-1rem",
                    borderColor: theme => theme.palette.primary.main,
                },
            }}
        >
            {/* Thumbnail */}
            {media && (
                <Box
                    component="img"
                    src={media.thumbnail}
                    alt={work.title[language]}
                    sx={{ width: "100%", height: "12rem", objectFit: "cover", opacity: 0.85 }}
                />
            )}

            {/* Info */}
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" fontWeight={600}>{work.title[language]}</Typography>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                    {work.tags.map(tag => (
                        <Chip key={tag} label={tag} size="small" sx={{ fontSize: 11 }} />
                    ))}
                </Box>
            </Box>

            {/* Corner decorations */}
            <Box className="pic-dec-bl" sx={{
                position: "absolute", width: "1.5rem", height: "2rem",
                bottom: "0.5rem", left: "0.5rem",
                borderLeft: 4, borderBottom: 4,
                borderColor: theme => theme.palette.divider,
                transition: "all 0.3s ease",
            }} />
            <Box className="pic-dec-tr" sx={{
                position: "absolute", width: "1.5rem", height: "2rem",
                top: "0.5rem", right: "0.5rem",
                borderRight: 4, borderTop: 4,
                borderColor: theme => theme.palette.divider,
                transition: "all 0.3s ease",
            }} />
        </Box>
    );
}

export default function WorkDetails({ categoryId, setActiveSection, setActiveWorkId }: WorkDetailsProps) {
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
        setActiveSection("work-item");
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
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
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
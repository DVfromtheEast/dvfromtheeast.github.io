"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Chip } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";


type WorkDetailsProps = {
    workId: string | null;
    categoryId: string | null;
    setActiveSection: (section: "home" | "about" | "works" | "work-details" | "work-item" | "abilities" | "contact") => void;
};

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";

type LocalizedString = { en: string; vi: string; de: string; };

type ContentBlock =
    | { type: "text"; title: LocalizedString; subtitle: LocalizedString; value: LocalizedString }
    | { type: "image"; url: string; caption: LocalizedString };

type Work = {
    id: string;
    title: string;
    description: LocalizedString;
    tags: string[];
    cover: string;
    intro: LocalizedString;
    content: ContentBlock[];
    links: {
        live: string | null;
        case_study: string | null;
    };
};

type Category = {
    id: string;
    label: LocalizedString;
    works: Work[];
};

type WorksData = {
    categories: Category[];
};



export default function WorkDetails({ workId, categoryId, setActiveSection }: WorkDetailsProps) {
    const { language } = useLanguage();
    const [work, setWork] = useState<Work | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWork() {
            try {
                const res = await fetch(`${API_URL}/data/works`);
                const data: WorksData = await res.json();
                const category = data.categories.find(c => c.id === categoryId);
                const found = category?.works.find(w => w.id === workId) || null;
                setWork(found);
            } catch (err) {
                console.error("Failed to fetch work:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchWork();
    }, [workId, categoryId]);

    if (loading) {
        return (
            <Box sx={{ width: "70%", mx: "auto", px: 2, py: 6 }}>
                <Skeleton variant="rectangular" height="24rem" sx={{ borderRadius: 1, mb: 4 }} />
                <Skeleton variant="text" width="50%" height={48} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="80%" />
            </Box>
        );
    }

    if (!work) return null;


    return (
        <Box sx={{ width: "70%", mx: "auto", px: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 6, py: 6 }}>
                {/* Back button */}
                <Box
                    onClick={() => setActiveSection("work-item")}
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
                {/* Title + Cover + meta */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    <Typography variant="body1" color="text.primary">
                        {work.intro[language]}
                    </Typography>
                    <Box
                        component="img"
                        src={`${work.cover}`}
                        alt={work.title[language]}
                        sx={{ width: 1, height: "auto", objectFit: "cover" }}
                    />
                    <Typography variant="h2" fontWeight={700}>{work.title}</Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {work.tags.map(tag => (
                            <Chip key={tag} label={tag} size="medium" sx={{ textTransform: "uppercase", }} />
                        ))}
                    </Box>

                    <Box sx={{ borderTop: theme => `1px solid ${theme.palette.divider}` }} />
                </Box>
                {/* Content blocks */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {work.content.map((block, i) => {
                        if (block.type === "text") return (
                            <Box key={i}>
                                {block.subtitle && (
                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                        {block.subtitle[language]}
                                    </Typography>
                                )}
                                <Typography variant="h4" color="text.primary">
                                    {block.title[language]}
                                </Typography>
                                <Typography variant="body1" color="text.primary">
                                    {block.value[language]}
                                </Typography>
                            </Box>
                        );

                        if (block.type === "image") return (
                            <Box key={i} component="figure" sx={{ m: 0 }}>
                                <Box
                                    component="img"
                                    src={block.url}
                                    alt={block.caption[language]}
                                    sx={{ width: 1, borderRadius: 1, objectFit: "cover" }}
                                />
                            </Box>
                        );

                        return null;
                    })}
                </Box>

                {/* Links */}
                {/* {(work.links.live || work.links.case_study) && (
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        {work.links.live && (
                            <Box
                                component="a"
                                href={work.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: "flex", alignItems: "center", gap: 0.5,
                                    color: "primary.main", textDecoration: "none",
                                    fontSize: 14, transition: "all 0.15s ease",
                                    "&:hover": { filter: "brightness(1.2)" },
                                }}
                            >
                                <OpenInNewIcon fontSize="small" />
                                Live
                            </Box>
                        )}
                        {work.links.case_study && (
                            <Box
                                component="a"
                                href={work.links.case_study}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: "flex", alignItems: "center", gap: 0.5,
                                    color: "primary.main", textDecoration: "none",
                                    fontSize: 14, transition: "all 0.15s ease",
                                    "&:hover": { filter: "brightness(1.2)" },
                                }}
                            >
                                <OpenInNewIcon fontSize="small" />
                                Case study
                            </Box>
                        )}
                    </Box>
                )} */}
            </Box>
        </Box>
    );
}
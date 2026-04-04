"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Grid, } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import { alpha } from "@mui/material/styles";

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";

type LocalizedString = {
    en: string;
    vi: string;
    de: string;
};

type Category = {
    id: string;
    label: LocalizedString;
    description: LocalizedString;
    thumbnail: string;
};


type WorksData = {
    categories: Category[];
};
type WorksProps = {
    setActiveSection: (section: 'home' | 'about' | 'works' | 'work-details' | 'abilities' | 'contact') => void;
    setActiveCategory: (id: string) => void;
};
function CategoryCard({
    category,
    language,
    onClick,
}: {
    category: Category;
    language: string;
    onClick: (id: string) => void;
}) {
    return (
        <Box
            onClick={() => onClick(category.id)}
            sx={{
                cursor: "pointer",
                position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', backgroundColor: theme => alpha(theme.palette.background.paper, 0.85), transition: 'all 0.2s ease', backdropFilter: "blur(5px)", p: 3.5, border: theme => `1px solid ${theme.palette.divider}`, '&:hover': {
                    transform: 'scale(0.96)', filter: 'brightness(1.2)', border: theme => `1px solid ${theme.palette.primary.main}`,
                }, '&:hover .pic-dec-bl': { bottom: '-1rem', left: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                '&:hover .pic-dec-tr': { top: '-1rem', right: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
            }}>
            <Box component="img" src={category.thumbnail} alt={category.label[language]} sx={{ width: '100%', height: 'auto', objectFit: 'cover', opacity: '0.8', }} />
            <Box sx={{ width: 1, textAlign: 'center', py: 4 }}>
                <Typography variant="h4" sx={{ whiteSpace: 'nowrap' }}>{category.label[language]}</Typography>
            </Box>
            <Box className="pic-dec-bl" sx={{
                position: 'absolute', width: '1.5rem', height: '2rem', bottom: '0.5rem', left: '0.5rem', borderLeft: 4, borderBottom: 4, borderColor: theme => ` ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
            }}></Box>
            <Box className="pic-dec-tr" sx={{
                position: 'absolute', width: '1.5rem', height: '2rem', top: '0.5rem', right: '0.5rem', borderRight: 4, borderTop: 4, borderColor: theme => ` ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
            }}></Box>

        </Box>
    );
}

export default function Works({ setActiveSection, setActiveCategory }: WorksProps) {
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [works, setWorks] = useState<WorksData | null>(null);

    useEffect(() => {
        async function fetchWorks() {
            try {
                const res = await fetch(`${API_URL}/data/works`);
                const data = await res.json();
                setWorks(data);
            } catch (err) {
                console.error("Failed to fetch works:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchWorks();
    }, []);

    function handleCategoryClick(id: string) {
        setActiveCategory(id);
        setActiveSection('work-details');
    }

    if (loading) {
        return (
            <Box sx={{ width: '70%', mx: "auto", px: 2 }}>
                {[...Array(1)].map((_, i) => (
                    <Box key={i} sx={{ mb: 4 }}>
                        <Skeleton variant="text" width="30%" height={32} />
                        <Skeleton variant="text" width="100%" />
                    </Box>
                ))}
                <Grid container spacing={3} sx={{ py: 6 }}>
                    {[...Array(4)].map((_, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Skeleton variant="rectangular" height="20rem" sx={{ borderRadius: 1 }} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }
    return (
        <Box sx={{ width: '70%', mx: "auto", px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, py: 6 }}>
                {/* Title */}
                <Box sx={{ pl: 2, borderLeft: theme => `4px solid ${theme.palette.primary.main}` }}>
                    <Typography variant="h2" fontWeight={700}>
                        Works
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        What I've done
                    </Typography>
                </Box>
                {/* Sections */}
                <Grid container spacing={3} sx={{
                    width: 1,
                    justifyContent: "space-between",
                    alignItems: "stretch",
                }}>
                    {works.categories.map((category) => (
                        <Grid item xs={12} sm={6} md={3} key={category.id}>
                            <CategoryCard
                                category={category}
                                language={language}
                                onClick={handleCategoryClick}
                            />
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </Box>
    )
}
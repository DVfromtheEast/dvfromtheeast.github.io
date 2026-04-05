"use client";

import { useEffect, useState, useRef } from "react";
import { Box, Typography, Skeleton, } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";

type LocalizedString = {
    en: string;
    vi: string;
    de: string;
};

type Skill = {
    id: string;
    label: LocalizedString;
    description: LocalizedString;
};

type SkillsData = {
    skills: Skill[];
};

export default function Skills() {
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<SkillsData | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        async function fetchSkills() {
            try {
                const res = await fetch(`${API_URL}/data/skills`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Failed to fetch skills:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSkills();
    }, []);

    useEffect(() => {
        if (!data) return;
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % data.skills.length);
        }, 3000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [data]);

    function handleSelect(index: number) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setActiveIndex(index);
    }

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

    if (!data) return null;
    const skills = data.skills;
    const active = skills[activeIndex];

    const visibleCount = 5;
    const half = Math.floor(visibleCount / 2);

    const getVisibleSkills = () => {
        return Array.from({ length: visibleCount }, (_, i) => {
            const index = (activeIndex - half + i + skills.length) % skills.length;
            return { skill: skills[index], index, offset: i - half };
        });
    };


    return (
        <Box sx={{ width: '70%', mx: "auto", px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, py: 6 }}>
                {/* Title */}
                <Box sx={{ pl: 2, borderLeft: theme => `4px solid ${theme.palette.primary.main}` }}>
                    <Typography variant="h2" fontWeight={700}>
                        Abilities
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        What I offer
                    </Typography>
                </Box>
                {/* Sections */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '80% 1fr', gap: 4, width: 1, alignItems: 'flex-start' }}>
                    <Box sx={{ position: 'relative', height: '30rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{
                            width: 1,
                            willChange: 'transform', display: 'grid',
                            gridTemplateColumns: '60% 1fr',
                            justifyContent: 'stretch',
                            justifyItems: 'stretch',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '2rem',
                                position: 'relative',
                                width: 1,
                            }}>{getVisibleSkills().map(({ skill, index, offset }) => {
                                const isActive = offset === 0;
                                const isAdjacent = Math.abs(offset) === 1;
                                return (
                                    <Box
                                        key={skill.id}
                                        onClick={() => handleSelect(index)}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            width: 1, pl: isActive ? 2 : 0, borderLeft: isActive ? theme => `4px solid ${theme.palette.primary.main}` : 'none',
                                            alignItems: 'center', display: 'flex',
                                            opacity: isActive ? 1 : isAdjacent ? 0.6 : 0.3,
                                            transform: `scale(${isActive ? 1 : isAdjacent ? 0.95 : 0.9})`,
                                            height: isActive ? '8.5rem' : isAdjacent ? 'auto' : 'auto',
                                            background: isActive ? theme => `linear-gradient(90deg,${theme.palette.primary.main}80, ${theme.palette.primary.main}40, ${theme.palette.primary.main}10)` : 'transparent',
                                        }}
                                    >
                                        <Typography
                                            variant={isActive ? 'h1' : isAdjacent ? 'h3' : 'h4'}
                                            sx={{
                                                fontWeight: isActive ? 700 : isAdjacent ? 600 : 500,
                                                color: isActive ? 'primary.main' : isAdjacent ? 'text.primary' : 'text.secondary',
                                                transition: 'all 0.3s ease',
                                                width: 1,
                                            }}
                                        >
                                            {skill.label[language]}
                                        </Typography>

                                    </Box>

                                );
                            })}

                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                justifyContent: 'center',
                                backdropFilter: "blur(5px)",
                                textAlign: 'right',
                                borderLeft: theme => `1px solid ${theme.palette.divider}`,
                                px: 2,
                                height: '8.5rem',
                                background: 'linear-gradient(90deg, rgba(144, 108, 210, 0.15), rgba(144, 108, 210, 0.15))',
                            }}>
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    sx={{ transition: 'all 0.3s ease' }}
                                >
                                    {active.description[language]}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography variant="subtitle1">
                            Softwares & Technologies
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
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
type Tool = {
    id: string;
    label: string;
    icon: string;
    description: LocalizedString;
};

type SkillsData = {
    skills: Skill[];
    tools: Tool[];
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
    const tools = data.tools;

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
                <Box sx={{ display: 'grid', gridTemplateColumns: '80% 1fr', gap: 3, width: 1, alignItems: 'flex-start' }}>
                    <Box sx={{ height: '40rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{
                            width: 1,
                            willChange: 'transform', display: 'grid',
                            gridTemplateColumns: '60% 1fr',
                            justifyContent: 'stretch',
                            justifyItems: 'stretch',
                            alignItems: 'start',
                            alignContent: 'center',
                            position: 'relative',
                        }}>
                            <Box sx={{ position: 'absolute', width: 1, height: '8.5rem', mt: '17rem', top: 0, background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}90, ${theme.palette.primary.main}45, ${theme.palette.primary.main}10)`, borderLeft: theme => `4px solid ${theme.palette.primary.main}` }} ></Box>
                            {/* Clip window */}
                            <Box
                                onWheel={(e) => {
                                    if (e.deltaY > 0) {
                                        handleSelect(Math.min(activeIndex + 1, skills.length - 1));
                                    } else {
                                        handleSelect(Math.max(activeIndex - 1, 0));
                                    }
                                }}
                                sx={{
                                    overflow: 'hidden',
                                    height: '40rem', // 5 items × ~8rem each
                                    position: 'relative',
                                    width: 1,
                                }}>

                                {/* Sliding list */}
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'absolute',
                                    width: 1,
                                    transform: `translateY(calc(${2 - activeIndex} * 8.5rem))`,
                                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}>
                                    {skills.map((skill, index) => {
                                        const offset = index - activeIndex;
                                        const isActive = offset === 0;
                                        const isAdjacent = Math.abs(offset) === 1;
                                        return (
                                            <Box
                                                key={skill.id}
                                                onClick={() => handleSelect(index)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    width: 1,
                                                    pl: isActive ? 2 : 0,
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    opacity: isActive ? 1 : isAdjacent ? 0.6 : 0.3,
                                                    transform: `scale(${isActive ? 1 : isAdjacent ? 0.95 : 0.9})`,
                                                    height: '8.5rem',
                                                }}
                                            >
                                                <Typography
                                                    variant={isActive ? 'h1' : isAdjacent ? 'h3' : 'h4'}
                                                    sx={{
                                                        fontWeight: isActive ? 700 : isAdjacent ? 600 : 500,
                                                        color: isActive ? 'primary.contrastText' : isAdjacent ? 'text.primary' : 'text.secondary',
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
                                mt: '17rem',
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {tools.map(tool => (
                                <Box key={tool.id} sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'start' }}>
                                    <Box
                                        component="img"
                                        src={tool.icon}
                                        alt={tool.label}
                                        sx={{ width: 32, height: 32, objectFit: 'contain' }}
                                    />
                                    <Box>
                                        <Typography variant="body2" fontWeight={600}>{tool.label}</Typography>
                                        <Typography variant="caption" color="text.secondary">{tool.description[language]}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Link, Skeleton } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import DVTextField from "../TextField";
import DVButton from "../Button";

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";

type ContactData = {
    title: {
        en: string;
        de: string;
        vi: string;
    };
    email: string;
    linkedin: string;
    x: string;
    discord: string;
    telegram: string;
};

export default function Contact() {
    const { language } = useLanguage();
    const [contact, setContact] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContact() {
            try {
                const res = await fetch(`${API_URL}/data/contact`);
                const data = await res.json();
                setContact(data);
            } catch (err) {
                console.error("Failed to fetch contact:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchContact();
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
    return (
        <Box sx={{ width: '70%', mx: "auto", px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, py: 6 }}>
                {/* Title */}
                <Box sx={{ pl: 2, borderLeft: theme => `4px solid ${theme.palette.primary.main}` }}>
                    <Typography variant="h2" fontWeight={700}>
                        {contact.title[language]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Have an exciting project you need help with? Send me message here or via email and other social platforms.
                    </Typography>
                </Box>
                {/* Sections */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 14, alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 2 / 5, alignItems: 'flex-start' }}>
                        <DVTextField label="Full name"
                            placeholder="Your full name..." />
                        <DVTextField label="Email"
                            placeholder="Your email..." />
                        <DVTextField label="Message"
                            placeholder="Message..." multiline
                            rows={6} />
                        <DVButton sx={{ width: 'fit-content' }}>Send</DVButton>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography variant="subtitle1">
                            Or reach me at
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body1" >Email: </Typography>
                            <Link variant="body1" sx={{ textDecoration: 'none' }} href={`mailto:${contact.email}`}>{contact.email}</Link>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                            <Link href={contact.linkedin} target="_blank">link</Link>
                            <Link href={contact.x} target="_blank">link</Link>
                            <Link href={contact.discord} target="_blank">link</Link>
                            <Link href={contact.telegram} target="_blank">link</Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
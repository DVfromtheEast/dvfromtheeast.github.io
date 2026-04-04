"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Link, Skeleton, SvgIcon, SvgIconProps } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useLanguage } from "../../context/LanguageContext";
import DVTextField from "../TextField";
import DVButton from "../Button";

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";

type LocalizedString = {
    en: string;
    vi: string;
    de: string;
};

type ContactData = {
    title: LocalizedString
    email: string;
    linkedin: string;
    x: string;
    discord: string;
    telegram: string;
};

const DiscordIcon: React.FC<SvgIconProps> = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </SvgIcon>
);

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
    if (!contact) return null;
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
                        <Link variant="body1" sx={{ textDecoration: 'none', transition: 'all 0.15s ease-in', '&:hover': { filter: 'brightness(1.2)' } }} href={`mailto:${contact.email}`}>{contact.email}</Link>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                            <Link href={contact.linkedin} target="_blank" sx={{ transition: 'all 0.15s ease-in', '&:hover': { transform: 'scale(0.9)', filter: 'brightness(1.2)' } }}><LinkedInIcon sx={{ fontSize: 36 }} /></Link>
                            <Link href={contact.x} target="_blank" sx={{ transition: 'all 0.15s ease-in', '&:hover': { transform: 'scale(0.9)', filter: 'brightness(1.2)' } }}><XIcon sx={{ fontSize: 36 }} /></Link>
                            <Link href={contact.discord} target="_blank" sx={{ transition: 'all 0.15s ease-in', '&:hover': { transform: 'scale(0.9)', filter: 'brightness(1.2)' } }}><DiscordIcon sx={{ fontSize: 36 }} /></Link>
                            <Link href={contact.telegram} target="_blank" sx={{ transition: 'all 0.15s ease-in', '&:hover': { transform: 'scale(0.9)', filter: 'brightness(1.2)' } }}><TelegramIcon sx={{ fontSize: 36 }} /></Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
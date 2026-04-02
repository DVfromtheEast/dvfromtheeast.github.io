"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Link, Skeleton, SvgIcon, SvgIconProps } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";


export default function Skills() {
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    // if (loading) {
    //     return (
    //         <Box sx={{ width: '70%', mx: "auto", px: 2 }}>
    //             {[...Array(4)].map((_, i) => (
    //                 <Box key={i} sx={{ mb: 4 }}>
    //                     <Skeleton variant="text" width="30%" height={32} />
    //                     <Skeleton variant="text" width="100%" />
    //                 </Box>
    //             ))}
    //         </Box>
    //     );
    // }
    return (
        <Box sx={{ width: '70%', mx: "auto", px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, py: 6 }}>
                {/* Title */}
                <Box sx={{ pl: 2, borderLeft: theme => `4px solid ${theme.palette.primary.main}` }}>
                    <Typography variant="h2" fontWeight={700}>
                        Skills
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        What I offer
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
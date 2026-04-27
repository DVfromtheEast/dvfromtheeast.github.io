"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";

type LocationData = {
    city: string;
    country: string;
    updatedAt: string;
};

export default function DVLocation() {
    const [location, setLocation] = useState<LocationData | null>(null);

    useEffect(() => {
        async function fetchLocation() {
            try {
                const res = await fetch(`${API_URL}/location`);
                if (!res.ok) return;
                const data = await res.json();
                setLocation(data);
            } catch {
                // location not available, fail silently
            }
        }
        fetchLocation();
    }, []);

    if (!location) return null;

    return (
        <Box sx={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
        }}> <Typography variant="caption">Currently, I'm in</Typography>
            <LocationOnIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption">
                {location.city}
            </Typography>
        </Box>
    );
}
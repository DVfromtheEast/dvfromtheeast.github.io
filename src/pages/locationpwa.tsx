"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import DVButton from "../components/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL?.replace("/chat", "") || "http://localhost:3001";
const SECRET = process.env.NEXT_PUBLIC_LOCATION_SECRET || "";
const INTERVAL_MS = 60 * 60 * 1000;

type Status = {
    message: string;
    type: "idle" | "success" | "error";
};

export default function LocationPwa() {
    const [running, setRunning] = useState(false);
    const [location, setLocation] = useState<string | null>(null);
    const [status, setStatus] = useState<Status>({ message: "Press start to begin sending location updates.", type: "idle" });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    function toggle() {
        if (running) {
            stop();
        } else {
            start();
        }
    }

    function start() {
        setRunning(true);
        setStatus({ message: "Fetching location...", type: "idle" });
        sendLocation();
        intervalRef.current = setInterval(sendLocation, INTERVAL_MS);
    }

    function stop() {
        setRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setStatus({ message: "Stopped.", type: "idle" });
    }

    async function sendLocation() {
        if (!navigator.geolocation) {
            setStatus({ message: "Geolocation not supported.", type: "error" });
            return;
        }

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
                const geoRes = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                );
                const geoData = await geoRes.json();
                const city =
                    geoData.address.city ||
                    geoData.address.town ||
                    geoData.address.village ||
                    geoData.address.state ||
                    "Unknown";
                const country = geoData.address.country || "Unknown";

                setLocation(`${city}, ${country}`);

                const res = await fetch(`${API_URL}/location`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-location-secret": SECRET,
                    },
                    body: JSON.stringify({ city, country }),
                });

                if (res.ok) {
                    const now = new Date().toLocaleTimeString();
                    setStatus({ message: `Last sent: ${now}`, type: "success" });
                } else {
                    setStatus({ message: "Failed to send to backend.", type: "error" });
                }
            } catch {
                setStatus({ message: "Error getting location.", type: "error" });
            }
        }, () => {
            setStatus({ message: "Location permission denied.", type: "error" });
        });
    }

    const statusColor = status.type === "success" ? "#56db23" : status.type === "error" ? "#e24b4a" : "#888";

    return (
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            px: 4,
        }}>
            <Typography variant="h4" fontWeight={700}>DV Location</Typography>

            {location && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "primary.main" }}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body1" fontWeight={500}>{location}</Typography>
                </Box>
            )}

            <Typography variant="body2" sx={{ color: statusColor, textAlign: "center" }}>
                {status.message}
            </Typography>

            <DVButton onClick={toggle} sx={{ width: "fit-content", px: 4 }}>
                {running ? "Stop" : "Start"}
            </DVButton>
            <Typography variant="caption" color="text.secondary">
                Updates every 60 minutes
            </Typography>
        </Box>
    );
}
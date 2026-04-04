import { Box, Typography, alpha } from "@mui/material";

type WorkDetailsProps = {
    categoryId: string | null;
    setActiveSection: (section: 'home' | 'about' | 'works' | 'work-details' | 'abilities' | 'contact') => void;
}

export default function WorkDetails({ categoryId, setActiveSection }: WorkDetailsProps) {
    return (
        <Box sx={{ width: '70%', mx: "auto", px: 2, py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ mb: 3 }}>Work Details</Typography>
            <Box component="img" src={`https://via.placeholder.com/800x400?text=Category+${categoryId}`} alt={`Category ${categoryId}`} sx={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 2 }} />
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body1">This is a detailed view of the selected work category. Here you can provide more information about the projects, including descriptions, technologies used, and links to live demos or repositories.</Typography>
            </Box>
        </Box>)
}
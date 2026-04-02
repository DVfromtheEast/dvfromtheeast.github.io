"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Link, Skeleton, Grid, Paper } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import { alpha } from "@mui/material/styles";


export default function Works() {
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
                    <Grid item xs={3}>
                        <Box sx={{
                            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '20rem', backgroundColor: alpha('#6962B2', 0.25), transition: 'all 0.2s ease', backdropFilter: "blur(5px)", '&:hover': {
                                transform: 'scale(0.96)', filter: 'brightness(1.2)', border: theme => `1px solid ${theme.palette.primary.main}`,
                            }, '&:hover .pic-dec-bl': { bottom: '-1rem', left: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                            '&:hover .pic-dec-tr': { top: '-1rem', right: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                        }}>
                            <Box component="img" src="./images/Landing_page_Design.png" sx={{ width: '60%', height: '60%', objectFit: 'cover', opacity: '0.8', }} />
                            <Box sx={{ position: 'absolute', bottom: 0, width: 1, p: 3, textAlign: 'center' }}>
                                <Typography variant="h4">Digital</Typography>
                            </Box>
                            <Box className="pic-dec-bl" sx={{
                                position: 'absolute', width: '1.5rem', height: '2rem', bottom: '0.5rem', left: '0.5rem', borderLeft: 4, borderBottom: 4, borderColor: "transparent",
                                transition: 'all 0.3s ease',
                            }}></Box>
                            <Box className="pic-dec-tr" sx={{
                                position: 'absolute', width: '1.5rem', height: '2rem', top: '0.5rem', right: '0.5rem', borderRight: 4, borderTop: 4, borderColor: "transparent",
                                transition: 'all 0.3s ease',
                            }}></Box>

                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{
                            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '20rem', backgroundColor: alpha('#6962B2', 0.25), transition: 'all 0.2s ease', backdropFilter: "blur(5px)", '&:hover': {
                                transform: 'scale(0.96)', filter: 'brightness(1.2)', border: theme => `1px solid ${theme.palette.primary.main}`,
                            }, '&:hover .pic-dec-bl': { bottom: '-1rem', left: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                            '&:hover .pic-dec-tr': { top: '-1rem', right: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                        }}>
                            <Box component="img" src="./images/Landing_page_Design.png" sx={{ width: '60%', height: '60%', objectFit: 'cover', opacity: '0.8', }} />
                            <Box sx={{ position: 'absolute', bottom: 0, width: 1, p: 3, textAlign: 'center' }}>
                                <Typography variant="h4">Digital</Typography>
                            </Box>
                            <Box className="pic-dec-bl" sx={{
                                position: 'absolute', width: '1.5rem', height: '2rem', bottom: '0.5rem', left: '0.5rem', borderLeft: 4, borderBottom: 4, borderColor: "transparent",
                                transition: 'all 0.3s ease',
                            }}></Box>
                            <Box className="pic-dec-tr" sx={{
                                position: 'absolute', width: '1.5rem', height: '2rem', top: '0.5rem', right: '0.5rem', borderRight: 4, borderTop: 4, borderColor: "transparent",
                                transition: 'all 0.3s ease',
                            }}></Box>

                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{
                            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '20rem', backgroundColor: alpha('#6962B2', 0.25), transition: 'all 0.2s ease', backdropFilter: "blur(5px)", '&:hover': {
                                transform: 'scale(0.96)', filter: 'brightness(1.2)', border: theme => `1px solid ${theme.palette.primary.main}`,
                            }, '&:hover .pic-dec-bl': { bottom: '-1rem', left: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                            '&:hover .pic-dec-tr': { top: '-1rem', right: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                        }}>
                            <Box component="img" src="./images/Landing_page_Design.png" sx={{ width: '60%', height: '60%', objectFit: 'cover', opacity: '0.8', }} />
                            <Box sx={{ position: 'absolute', bottom: 0, width: 1, p: 3, textAlign: 'center' }}>
                                <Typography variant="h4">Digital</Typography>
                            </Box>
                            <Box className="pic-dec-bl" sx={{
                                position: 'absolute', width: '1.5rem', height: '2rem', bottom: '0.5rem', left: '0.5rem', borderLeft: 4, borderBottom: 4, borderColor: "transparent",
                                transition: 'all 0.3s ease',
                            }}></Box>
                            <Box className="pic-dec-tr" sx={{
                                position: 'absolute', width: '1.5rem', height: '2rem', top: '0.5rem', right: '0.5rem', borderRight: 4, borderTop: 4, borderColor: "transparent",
                                transition: 'all 0.3s ease',
                            }}></Box>

                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{
                            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '20rem', backgroundColor: alpha('#6962B2', 0.25), transition: 'all 0.1s ease', backdropFilter: "blur(5px)", '&:hover': {
                                transform: 'scale(0.96)', filter: 'brightness(1.2)', border: theme => `1px solid ${theme.palette.primary.main}`,
                            }, '&:hover .pic-dec-bl': { bottom: '-1rem', left: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                            '&:hover .pic-dec-tr': { top: '-1rem', right: '-1rem', borderColor: theme => ` ${theme.palette.primary.main}` },
                        }}>
                            <Box component="img" src="./images/Landing_page_Design.png" sx={{ width: '60%', height: '60%', objectFit: 'cover', opacity: '0.8', }} />
                            <Box sx={{ position: 'absolute', bottom: 0, width: 1, p: 3, textAlign: 'center' }}>
                                <Typography variant="h4">Digital</Typography>
                            </Box>
                            <Box className="pic-dec-bl" sx={{
                                position: 'absolute', width: '1.5rem', height: '2rem', bottom: '0.5rem', left: '0.5rem', borderLeft: 4, borderBottom: 4, borderColor: "transparent",
                                transition: 'all 0.3s ease',
                            }}></Box>
                            <Box className="pic-dec-tr" sx={{
                                position: 'absolute', width: '1.5rem', height: '2rem', top: '0.5rem', right: '0.5rem', borderRight: 4, borderTop: 4, borderColor: "transparent",
                                transition: 'all 0.3s ease',
                            }}></Box>

                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </Box>
    )
}
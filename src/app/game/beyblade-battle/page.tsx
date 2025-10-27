"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Stack,
} from "@mui/material";
import EnhancedBeybladeArena from "../components/EnhancedBeybladeArena";

export default function BeybladeGamePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "text.primary" }}
          >
            🌪️ Beyblade Battle Arena
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 600,
              mx: "auto",
              color: "text.secondary",
            }}
          >
            Real-time Beyblade battles! Control your Beyblade with your mouse
            while the AI pursues you. Both start with 100% spin - collisions
            reduce spin until one Beyblade remains!
          </Typography>
        </Box>

        {/* Main Game Arena */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
          <EnhancedBeybladeArena />
        </Box>

        {/* Game Information Cards */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ mb: 6 }}
        >
          {/* Game Features Card */}
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "background.paper",
                border: "2px solid",
                borderColor: "primary.main",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 30px rgba(0, 149, 246, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.primary",
                    fontWeight: "bold",
                  }}
                >
                  <span style={{ marginRight: "12px" }}>⚡</span>
                  Game Features
                </Typography>
                <List>
                  {[
                    {
                      icon: "🎮",
                      title: "Real-time Control",
                      desc: "Mouse movement controls your Beyblade instantly",
                    },
                    {
                      icon: "🌀",
                      title: "Spin Mechanics",
                      desc: "Both start at 100% spin, decay over time",
                    },
                    {
                      icon: "💥",
                      title: "Collision Physics",
                      desc: "Every hit reduces spin for both Beyblades",
                    },
                    {
                      icon: "🏟️",
                      title: "Stadium Boundaries",
                      desc: "Ring-out victories possible",
                    },
                    {
                      icon: "🤖",
                      title: "AI Opponent",
                      desc: "Intelligent enemy that hunts you down",
                    },
                  ].map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Typography variant="h6">{feature.icon}</Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            fontWeight="bold"
                            sx={{ color: "text.primary" }}
                          >
                            {feature.title}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: "text.secondary" }}>
                            {feature.desc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>

          {/* Strategy Tips Card */}
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "background.paper",
                border: "2px solid #2ed573",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 30px rgba(46, 213, 115, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.primary",
                    fontWeight: "bold",
                  }}
                >
                  <span style={{ marginRight: "12px" }}>🧠</span>
                  Strategy Tips
                </Typography>
                <List>
                  {[
                    {
                      icon: "🏃",
                      title: "Stay Mobile",
                      desc: "Keep moving to avoid AI attacks",
                    },
                    {
                      icon: "🎯",
                      title: "Strategic Collisions",
                      desc: "Time your hits when enemy has low spin",
                    },
                    {
                      icon: "📍",
                      title: "Positioning",
                      desc: "Use stadium edges to your advantage",
                    },
                    {
                      icon: "⚖️",
                      title: "Spin Management",
                      desc: "Avoid unnecessary collisions early on",
                    },
                    {
                      icon: "🏁",
                      title: "Endgame",
                      desc: "Low spin makes you vulnerable to ring-outs",
                    },
                  ].map((tip, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Typography variant="h6">{tip.icon}</Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            fontWeight="bold"
                            sx={{ color: "text.primary" }}
                          >
                            {tip.title}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: "text.secondary" }}>
                            {tip.desc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* Advanced Mechanics Section */}
        <Card
          sx={{
            backgroundColor: "background.paper",
            border: "2px solid",
            borderColor: "primary.main",
            boxShadow: "0 10px 30px rgba(0, 149, 246, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.primary",
                fontWeight: "bold",
              }}
            >
              <span style={{ marginRight: "12px" }}>🔬</span>
              Advanced Battle Mechanics
            </Typography>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              {/* Blue Zone */}
              <Box sx={{ flex: 1 }}>
                <Card
                  sx={{
                    bgcolor: "#1a2332",
                    height: "100%",
                    border: "2px solid #3b82f6",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#60a5fa",
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        fontWeight: "bold",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>🔵</span>
                      Blue Speed Zone
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                      Triggers a mandatory 1-second loop with 2× acceleration.
                      Player retains control, AI loses control. 3-second
                      cooldown after each loop.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              {/* Red Zones */}
              <Box sx={{ flex: 1 }}>
                <Card
                  sx={{
                    bgcolor: "#2d1b1b",
                    height: "100%",
                    border: "2px solid #ef4444",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#f87171",
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        fontWeight: "bold",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>🔴</span>
                      Wall Zones
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                      Angles 0-60°, 120-180°, 240-300°. Collision causes spin
                      loss (10 + acceleration) and respawn inside blue circle.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              {/* Yellow Zones */}
              <Box sx={{ flex: 1 }}>
                <Card
                  sx={{
                    bgcolor: "#2d2619",
                    height: "100%",
                    border: "2px solid #f59e0b",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fbbf24",
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        fontWeight: "bold",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>🟡</span>
                      Exit Zones
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                      Angles 60-120°, 180-240°, 300-360°. Cross these boundaries
                      and it's game over - instant elimination!
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Stack>

            {/* Collision Damage */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Card sx={{ bgcolor: "#1a2332", border: "2px solid #0ea5e9" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#38bdf8", fontWeight: "bold" }}
                    >
                      ⚡ Same Spin Collision
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                      Damage = |acceleration difference| + other Beyblade's
                      acceleration
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Card sx={{ bgcolor: "#2d1b2d", border: "2px solid #ec4899" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#f472b6", fontWeight: "bold" }}
                    >
                      💥 Opposite Spin Collision
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                      Both get average spin + their acceleration, take average
                      acceleration + other's acceleration damage
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

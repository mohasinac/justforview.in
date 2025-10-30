"use client";

import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  Avatar,
  CircularProgress,
  SelectChangeEvent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Casino as RandomIcon } from "@mui/icons-material";
import { useBeyblades } from "@/hooks/useBeyblades";
import { BeybladeStats } from "@/types/beybladeStats";

interface BeybladeSelectProps {
  value: string;
  onChange: (beybladeId: string) => void;
  label: string;
  disabled?: boolean;
  showRandomButton?: boolean;
}

export default function BeybladeSelect({
  value,
  onChange,
  label,
  disabled = false,
  showRandomButton = false,
}: BeybladeSelectProps) {
  const { beyblades, loading, error } = useBeyblades();

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const handleRandomSelect = () => {
    if (beyblades.length === 0) return;
    const randomIndex = Math.floor(Math.random() * beyblades.length);
    onChange(beyblades[randomIndex].id);
  };

  const selectedBeyblade = beyblades.find((b) => b.id === value);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      attack: "#ff4757",
      defense: "#5352ed",
      stamina: "#ffa502",
      balanced: "#2ed573",
    };
    return colors[type] || "#666";
  };

  const getTypeGradient = (type: string) => {
    const gradients: Record<string, string> = {
      attack: "linear-gradient(135deg, #ff4757 0%, #ff6348 100%)",
      defense: "linear-gradient(135deg, #5352ed 0%, #3742fa 100%)",
      stamina: "linear-gradient(135deg, #ffa502 0%, #ff6348 100%)",
      balanced: "linear-gradient(135deg, #2ed573 0%, #7bed9f 100%)",
    };
    return gradients[type] || "linear-gradient(135deg, #666 0%, #999 100%)";
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
        <CircularProgress size={24} />
        <Typography>Loading Beyblades...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, bgcolor: "error.light", borderRadius: 2 }}>
        <Typography color="error.dark" fontWeight="bold">
          ⚠️ Error Loading Beyblades
        </Typography>
        <Typography variant="body2" color="error.dark" sx={{ mt: 1 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (beyblades.length === 0) {
    return (
      <Box
        sx={{
          p: 3,
          bgcolor: "warning.light",
          borderRadius: 2,
          border: "2px solid",
          borderColor: "warning.main",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          color="warning.dark"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          🎮 No Beyblades Available
        </Typography>
        <Typography variant="body2" color="warning.dark" sx={{ mb: 2 }}>
          No beyblades found in the database. Please ask the admin to add
          beyblades before starting a battle.
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", fontStyle: "italic" }}
        >
          Admin: Go to Admin → Game → Beyblades to create beyblades
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "flex-start", gap: 1, width: "100%" }}
    >
      <FormControl fullWidth disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={handleChange}
          renderValue={(selected) => {
            const beyblade = beyblades.find((b) => b.id === selected);
            if (!beyblade) return selected;

            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  src={beyblade.imageUrl}
                  sx={{
                    width: 32,
                    height: 32,
                    background: beyblade.imageUrl
                      ? undefined
                      : getTypeGradient(beyblade.type),
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                  }}
                >
                  {!beyblade.imageUrl &&
                    (beyblade.displayName?.charAt(0) ||
                      beyblade.name?.charAt(0) ||
                      "?")}
                </Avatar>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography fontWeight="bold">
                    {beyblade.displayName || beyblade.name}
                  </Typography>
                  <Chip
                    label={beyblade.type.toUpperCase()}
                    size="small"
                    sx={{
                      bgcolor: getTypeColor(beyblade.type),
                      color: "white",
                      fontSize: "0.65rem",
                      height: 20,
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              </Box>
            );
          }}
        >
          {beyblades.map((beyblade) => (
            <MenuItem key={beyblade.id} value={beyblade.id}>
              <BeybladeMenuItem beyblade={beyblade} />
            </MenuItem>
          ))}
        </Select>

        {/* Preview of Selected Beyblade */}
        {selectedBeyblade && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "action.hover",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Avatar
                src={selectedBeyblade.imageUrl}
                sx={{
                  width: 60,
                  height: 60,
                  background: selectedBeyblade.imageUrl
                    ? undefined
                    : getTypeGradient(selectedBeyblade.type),
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {!selectedBeyblade.imageUrl &&
                  (selectedBeyblade.displayName?.charAt(0) ||
                    selectedBeyblade.name?.charAt(0) ||
                    "?")}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {selectedBeyblade.displayName || selectedBeyblade.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                  <Chip
                    label={selectedBeyblade.type.toUpperCase()}
                    size="small"
                    sx={{
                      bgcolor: getTypeColor(selectedBeyblade.type),
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  />
                  <Chip
                    label={`${selectedBeyblade.spinDirection.toUpperCase()} SPIN`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>

            {/* Quick Stats */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                mb: 2,
              }}
            >
              <StatChip
                label="Attack"
                value={selectedBeyblade.typeDistribution.attack}
                max={150}
                color="#ff4757"
              />
              <StatChip
                label="Defense"
                value={selectedBeyblade.typeDistribution.defense}
                max={150}
                color="#5352ed"
              />
              <StatChip
                label="Stamina"
                value={selectedBeyblade.typeDistribution.stamina}
                max={150}
                color="#ffa502"
              />
            </Box>

            {/* Special Move */}
            {selectedBeyblade.specialMove && (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  ⚡ SPECIAL MOVE
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {selectedBeyblade.specialMove.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedBeyblade.specialMove.description}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </FormControl>

      {showRandomButton && (
        <Tooltip title="Random Beyblade">
          <span>
            <IconButton
              onClick={handleRandomSelect}
              disabled={disabled || loading || beyblades.length === 0}
              color="primary"
              sx={{ mt: 1 }}
            >
              <RandomIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Box>
  );
}

// Menu Item Component for Dropdown
function BeybladeMenuItem({ beyblade }: { beyblade: BeybladeStats }) {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      attack: "#ff4757",
      defense: "#5352ed",
      stamina: "#ffa502",
      balanced: "#2ed573",
    };
    return colors[type] || "#666";
  };

  const getTypeGradient = (type: string) => {
    const gradients: Record<string, string> = {
      attack: "linear-gradient(135deg, #ff4757 0%, #ff6348 100%)",
      defense: "linear-gradient(135deg, #5352ed 0%, #3742fa 100%)",
      stamina: "linear-gradient(135deg, #ffa502 0%, #ff6348 100%)",
      balanced: "linear-gradient(135deg, #2ed573 0%, #7bed9f 100%)",
    };
    return gradients[type] || "linear-gradient(135deg, #666 0%, #999 100%)";
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        width: "100%",
        py: 0.5,
      }}
    >
      <Avatar
        src={beyblade.imageUrl}
        sx={{
          width: 40,
          height: 40,
          background: beyblade.imageUrl
            ? undefined
            : getTypeGradient(beyblade.type),
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        {!beyblade.imageUrl &&
          (beyblade.displayName?.charAt(0) || beyblade.name?.charAt(0) || "?")}
      </Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {beyblade.displayName || beyblade.name}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Chip
            label={beyblade.type.toUpperCase()}
            size="small"
            sx={{
              bgcolor: getTypeColor(beyblade.type),
              color: "white",
              fontSize: "0.65rem",
              height: 18,
              fontWeight: "bold",
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {beyblade.typeDistribution.attack}A /{" "}
            {beyblade.typeDistribution.defense}D /{" "}
            {beyblade.typeDistribution.stamina}S
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Stat Chip Component
function StatChip({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 1,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight="bold" sx={{ color }}>
        {value}
      </Typography>
      <Box
        sx={{
          mt: 0.5,
          height: 3,
          borderRadius: 1.5,
          bgcolor: "action.hover",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${percentage}%`,
            bgcolor: color,
          }}
        />
      </Box>
    </Box>
  );
}

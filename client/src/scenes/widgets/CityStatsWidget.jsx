import { Typography, useTheme } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

const CityStatsWidget = () => {
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const [stats, setStats] = useState({});

  const getStats = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setStats(data);
  }, [token]);

  useEffect(() => {
    getStats();
  }, [getStats]);

  return (
    <div style={{ padding: "1.5rem", borderRadius: "1rem", background: palette.background.alt }}>
      <Typography fontWeight="600">📊 City Issue Stats</Typography>

      <Typography mt="1rem">🚧 Road: <b>{stats.Road || 0}</b></Typography>
      <Typography>💧 Water: <b>{stats.Water || 0}</b></Typography>
      <Typography>⚡ Electricity: <b>{stats.Electricity || 0}</b></Typography>
      <Typography>🗑 Garbage: <b>{stats.Garbage || 0}</b></Typography>
    </div>
  );
};

export default CityStatsWidget;

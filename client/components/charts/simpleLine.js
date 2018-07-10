import React from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';

export default function SimpleLine(props) {
  const { syncId, pluck, data } = props;
  let maxSeed = 0;
  let maxLeech = 0;
  const newData = data.map((snapshot) => {
    const newSnapshot = { ...snapshot };
    if (snapshot.seed > maxSeed) maxSeed = snapshot.seed;
    if (snapshot.leech > maxLeech) maxLeech = snapshot.leech;
    const ratio = snapshot.seed / snapshot.leech;
    newSnapshot.ratio = Math.floor(ratio * 100) / 100;
    return snapshot;
  });
  const yAxisKey = maxSeed >= maxLeech ? 'seed' : 'leech';
  return (
    <ResponsiveContainer height={150}>
      <LineChart
        data={newData}
        syncId={syncId}
        isAnimationActive={false}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <YAxis dataKey={yAxisKey} axisLine={!false} tickLine={false} hide={!false} />

        <XAxis dataKey="date" axisLine={!false} tickLine={false} hide={!false} />
        <Tooltip />
        {pluck.map((set, index) => (
          <Line
            key={`${index}-${set.key}`}
            type="monotone"
            dataKey={set.key}
            stroke={set.color}
            fill={set.color}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

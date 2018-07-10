import React from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';
import moment from 'moment';
import styled, { withTheme } from 'styled-components';

const CustomHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  opacity: 0.75;
  padding: 5px;
  font-size: 0.8em;
  border: solid 2px black;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  width: 8em;
  & p,
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const CustomLabel = styled.div`
  font-weight: bold;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
const Describe = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 2px;
`;

const Row = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: ${props => props.fillcolor};
`;

const Left = styled.div`
  width: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  font-weight: bold;
`;

const Right = styled.div`
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomTooltip = (props) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <CustomHolder>
        <CustomLabel>
          <p>{`${payload[0].payload.date}`}</p>
        </CustomLabel>
        <Describe>
          <Row fillcolor={payload[1].fill}>
            <Left>{payload[1].dataKey}ers</Left>
            <Right>{payload[1].value}</Right>
          </Row>
          <Row fillcolor={payload[0].fill}>
            <Left>{payload[0].dataKey}ers</Left>
            <Right>{payload[0].value}</Right>
          </Row>
        </Describe>
      </CustomHolder>
    );
  }

  return null;
};

const StyledToolTip = withTheme(CustomTooltip);

const SyncLine = (props) => {
  const { syncId, pluck, data } = props;
  let maxSeed = 0;
  let maxLeech = 0;

  const holderObj = {};
  data.forEach((snap) => {
    if (snap.seed > maxSeed) maxSeed = snap.seed;
    if (snap.leech > maxLeech) maxLeech = snap.leech;
    const ratio = snap.seed / snap.leech;
    const generalDate = moment(new Date(snap.date)).format('MM/DD/YYYY');
    if (holderObj[generalDate]) {
      const currentRatio = holderObj[generalDate].seed / holderObj[generalDate].leech;
      if (snap.seed > holderObj[generalDate].seed) holderObj[generalDate].seed = snap.seed;
      if (snap.leech > holderObj[generalDate].leech) holderObj[generalDate].leech = snap.leech;
      if (currentRatio > holderObj[generalDate].ration) holderObj[generalDate].ratio = currentRatio;
    } else {
      holderObj[generalDate] = {
        ratio: Math.floor(ratio * 100) / 100, // eslint-disable-line
        date: generalDate,
        seed: snap.seed,
        leech: snap.leech,
      };
    }
  });
  const newData = Object.keys(holderObj).map(key => holderObj[key]);
  const yAxisKey = maxSeed >= maxLeech ? 'seed' : 'leech';
  return (
    <ResponsiveContainer height={150}>
      <LineChart
        data={newData}
        syncId={syncId}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <YAxis dataKey={yAxisKey} axisLine={!false} tickLine={false} hide={false} />

        <XAxis dataKey="date" axisLine={!false} tickLine={false} hide={false} />
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
        <Tooltip content={<StyledToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SyncLine;

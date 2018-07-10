import React from 'react';
import styled from 'styled-components';
import themeColors from '../../theme/colors';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, LabelList } from 'recharts';

const ConstrainResponsiveContainer = styled.div`
  max-width: 260px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

class SeedLeechPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  render() {
    if (!this.props.seed || !this.props.leech) return <div />;
    const data = [
      { name: 'seeders', value: this.props.seed },
      { name: 'leechers', value: this.props.leech },
    ];
    const COLORS = { seeders: themeColors.seed, leechers: themeColors.leech };

    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      fill,
      innerRadius,
      outerRadius,
      percent,
      payload,
      value,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.4;
      const x2 = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.4;
      const y2 = y - 15;

      return (
        <g>
          <text
            x={x}
            y={y}
            fill={fill}
            fontSize={'12px'}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${payload.name}`}
          </text>
          <text
            x={x}
            y={y2}
            fill={fill}
            fontWeight={700}
            fontSize={'13px'}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${value}`}
          </text>
        </g>
      );
    };

    const RADIAN = Math.PI / 180;
    return (
      <ConstrainResponsiveContainer>
        <ResponsiveContainer height={130}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx={120}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={40}
              outerRadius={50}
              paddingAngle={5}
              label={renderCustomizedLabel}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={index} strokeWidth={0} fill={COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ConstrainResponsiveContainer>
    );
  }
}

export default SeedLeechPie;

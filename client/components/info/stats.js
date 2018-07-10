import React from 'react';
import moment from 'moment';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

import BasicToolTip from '../tooltip/basic';
import SectionHeader from '../sectionHeader';

/**
 * STYLES
 */

const StateContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InfoColumn = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Item = styled.div`
  min-width: 200px;
  flex-grow: 1;
  padding: 0.5em;
  margin: 0.5em;
  background-color: ${props => lighten(0.98, props.theme.colors.quinary)};
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1em;
  font-family: ${props => props.theme.fonts.header};
`;

const Title = styled.div`
  color: ${props => lighten(0.65, props.theme.colors.quinary)};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  text-transform: uppercase;
  font-size: 1em;
`;

const Value = styled.div`
  padding: 0.4em 0em 0em 0em;
  display: inline-flex;
  width: 100%;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  font-weight: light;
`;

const ValueColumn = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  line-height: 1em;
  flex-grow: 1;
  flex-basis: auto;
`;
const ValueNumber = styled.div`
  display: inline;
  font-size: 1.4em;
  padding: 0px;
  margin: 0px;
  line-height: 1.2em;
`;
const ValueNumberDate = styled.div`
  font-size: 1.4em;
`;
const ValueDate = styled.div`
  flex-grow: 1;
  flex-basis: auto;
  font-size: 0.7em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: ${props => lighten(0.55, props.theme.colors.quinary)};
`;

/**
 * COMPONENT
 */

const Stats = (props) => {
  const { info } = props;
  const justFullDateFormat = 'MMMM Do YYYY';
  const justDateFormat = 'MM/DD/YYYY';
  const justTimeFormat = 'h:mm:ss a';
  return (
    <div>
      <SectionHeader>General Info</SectionHeader>
      <StateContainer>
        <InfoColumn>
          <Item>
            <Title>
              <div>uploaded on</div>
              <BasicToolTip message="The date listed as the upload date from the originating torrent site." />
            </Title>
            <Value>
              <ValueColumn>
                <div>{moment(info.uploadDate).format(justFullDateFormat)}</div>
                <div>{moment(info.uploadDate).format(justTimeFormat)}</div>
              </ValueColumn>
            </Value>
          </Item>
          <Item>
            <Title>
              <div>upload discovered</div>
              <BasicToolTip message="The date we first saw this torrent in our scrapes." />
            </Title>
            <Value>
              <ValueColumn>
                <div>{moment(info.createdAt).format(justFullDateFormat)}</div>
                <div>{moment(info.createdAt).format(justTimeFormat)}</div>
              </ValueColumn>
            </Value>
          </Item>
          <Item>
            <Title>
              <div>last scraped</div>
              <BasicToolTip message="The last date we scraped this torrent." />
            </Title>
            <Value>
              <ValueColumn>
                <div>{moment(info.updatedAt).format(justFullDateFormat)}</div>
                <div>{moment(info.updatedAt).format(justTimeFormat)}</div>
              </ValueColumn>
            </Value>
          </Item>
        </InfoColumn>
        <InfoColumn>
          <Item>
            <Title>
              <div>ratio</div>
              <BasicToolTip message="The current seed/leech ratio." />
            </Title>
            <Value>
              <ValueNumber>{info.ratio}</ValueNumber>
            </Value>
          </Item>
          <Item>
            <Title>
              <div>lowest ratio</div>
              <BasicToolTip message="The lowest seed/leech ratio and the date when we saw it." />
            </Title>
            <Value>
              <ValueNumberDate>{info.minRatio}</ValueNumberDate>
              <ValueDate>
                <div>{moment(info.minRatioDate).format(justDateFormat)}</div>
                <div>{moment(info.minRatioDate).format(justTimeFormat)}</div>
              </ValueDate>
            </Value>
          </Item>
          <Item>
            <Title>
              <div>highest ratio</div>
              <BasicToolTip message="The highest seed/leech ratio and the date when we saw it." />
            </Title>
            <Value>
              <ValueNumberDate>{info.maxRatio}</ValueNumberDate>
              <ValueDate>
                <div>{moment(info.maxRatioDate).format(justDateFormat)}</div>
                <div>{moment(info.maxRatioDate).format(justTimeFormat)}</div>
              </ValueDate>
            </Value>
          </Item>
        </InfoColumn>
        <InfoColumn>
          <Item>
            <Title>
              <div>current seed</div>
              <BasicToolTip message="The current amount of users sharing this file." />
            </Title>
            <Value>
              <ValueNumber>{info.seed}</ValueNumber>
            </Value>
          </Item>
          <Item>
            <Title>
              <div>lowest seed</div>
              <BasicToolTip message="The lowest amount of users sharing this file and the date we saw it." />
            </Title>
            <Value>
              <ValueNumberDate>{info.minSeed}</ValueNumberDate>
              <ValueDate>
                <div>{moment(info.minSeedDate).format(justDateFormat)}</div>
                <div>{moment(info.minSeedDate).format(justTimeFormat)}</div>
              </ValueDate>
            </Value>
          </Item>
          <Item>
            <Title>
              <div>highest seed</div>
              <BasicToolTip message="The highest amount of users sharing this file and the date we saw it." />
            </Title>
            <Value>
              <ValueNumberDate>{info.maxSeed}</ValueNumberDate>
              <ValueDate>
                <div>{moment(info.maxSeedDate).format(justDateFormat)}</div>
                <div>{moment(info.maxSeedDate).format(justTimeFormat)}</div>
              </ValueDate>
            </Value>
          </Item>
        </InfoColumn>
        <InfoColumn>
          <Item>
            <Title>
              <div>current leech</div>
              <BasicToolTip message="The current amount of users downloading this file." />
            </Title>
            <Value>
              <ValueNumber>{info.leech}</ValueNumber>
            </Value>
          </Item>
          <Item>
            <Title>
              <div>lowest leech</div>
              <BasicToolTip message="The lowest amount of users downloading this file and the date we saw it." />
            </Title>
            <Value>
              <ValueNumberDate>{info.minLeech}</ValueNumberDate>
              <ValueDate>
                <div>{moment(info.minLeechDate).format(justDateFormat)}</div>
                <div>{moment(info.minLeechDate).format(justTimeFormat)}</div>
              </ValueDate>
            </Value>
          </Item>
          <Item>
            <Title>
              <div>highest leech</div>
              <BasicToolTip message="The highest amount of users downloading this file and the date we saw it." />
            </Title>
            <Value>
              <ValueNumberDate>{info.maxLeech}</ValueNumberDate>
              <ValueDate>
                <div>{moment(info.maxLeechDate).format(justDateFormat)}</div>
                <div>{moment(info.maxLeechDate).format(justTimeFormat)}</div>
              </ValueDate>
            </Value>
          </Item>
        </InfoColumn>
      </StateContainer>
    </div>
  );
};

export default withTheme(Stats);

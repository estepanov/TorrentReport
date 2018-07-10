import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SyncLine from '../charts/syncLine';

import SectionHeader from '../sectionHeader';
/**
 * STYLES
 */

const InfoListContainer = styled.div`
  margin-top: 0.5em;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled(Link)`
  font-family: ${props => props.theme.fonts.header};
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
  background-color: ${props => lighten(0.35, props.theme.colors.secondary)};
  &:hover {
    background-color: ${props => lighten(0.4, props.theme.colors.secondary)};
  }
  padding: 1em;
  margin: 0em 0em 0.5em 0em;
`;

const Top = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: row;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.2em;
`;

const UploadDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: right;
  @media (max-width: ${props => props.theme.mobile.width}) {
    align-items: flex-start;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Value = styled.div`
  font-size: 1.4em;
  color: ${props => darken(0.4, props.theme.colors.secondary)};
`;
const Descriptor = styled.div`
  color: ${props => lighten(0.15, props.theme.colors.secondary)};
  text-transform: uppercase;
  font-size: 0.7em;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0 0 0;
`;
const InfoContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: auto;
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  width: 100%;
`;
const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.9em;
  color: ${props => lighten(0.15, props.theme.colors.secondary)};
  width: 7em;
  text-transform: uppercase;
`;
const InfoValue = styled.div`
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 7em;
`;
const Chart = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 30px 0 0 0;
  min-width: 330px;
  left: -30px;
  position: relative;
`;

/**
 * COMPONENT
 */

const BreakdownListingsInfos = (props) => {
  const justFullDateFormat = 'MMMM Do YYYY';
  const { infos, aggregateSnapshotCount } = props;
  return (
    <div>
      <SectionHeader>uploads by users (select ONE)</SectionHeader>
      <InfoListContainer>
        {infos &&
          infos.map(info => (
            <Item to={`/info/${info.id}`} key={info.id}>
              <Top>
                <User>
                  <Value>{info.uploadUser}</Value>
                  <Descriptor>upload user</Descriptor>
                </User>
                <UploadDate>
                  <Value>{moment(info.uploadDate).format(justFullDateFormat)}</Value>
                  <Descriptor>upload date</Descriptor>
                </UploadDate>
              </Top>
              <Details>
                <InfoContainer>
                  <InfoGroup>
                    {info.category && (
                      <InfoItem>
                        <InfoLabel>listed as</InfoLabel>
                        <InfoValue>{info.category}</InfoValue>
                      </InfoItem>
                    )}
                    {info.size && (
                      <InfoItem>
                        <InfoLabel>torrent size</InfoLabel>
                        <InfoValue>{info.size}</InfoValue>
                      </InfoItem>
                    )}
                  </InfoGroup>
                  <InfoGroup>
                    <InfoItem>
                      <InfoLabel>ratio</InfoLabel>
                      <InfoValue>{info.ratio}</InfoValue>
                    </InfoItem>
                    {info.ratio !== info.maxRatio &&
                      info.maxRatio !== info.minRatio && (
                        <div>
                          <InfoItem>
                            <InfoLabel>max ratio</InfoLabel>
                            <InfoValue>{info.maxRatio}</InfoValue>
                          </InfoItem>
                          <InfoItem>
                            <InfoLabel>min ratio</InfoLabel>
                            <InfoValue>{info.minRatio}</InfoValue>
                          </InfoItem>
                        </div>
                      )}
                  </InfoGroup>
                  <InfoGroup>
                    <InfoItem>
                      <InfoLabel>seeders</InfoLabel>
                      <InfoValue>{info.seed}</InfoValue>
                    </InfoItem>
                    {info.seed !== info.maxSeed &&
                      info.maxSeed !== info.minSeed && (
                        <div>
                          <InfoItem>
                            <InfoLabel>max seeders</InfoLabel>
                            <InfoValue>{info.maxSeed}</InfoValue>
                          </InfoItem>
                          <InfoItem>
                            <InfoLabel>min seeders</InfoLabel>
                            <InfoValue>{info.minSeed}</InfoValue>
                          </InfoItem>
                        </div>
                      )}
                  </InfoGroup>
                  <InfoGroup>
                    <InfoItem>
                      <InfoLabel>leechers</InfoLabel>
                      <InfoValue>{info.leech}</InfoValue>
                    </InfoItem>
                    {info.leech !== info.maxLeech &&
                      info.maxLeech !== info.minLeech && (
                        <div>
                          <InfoItem>
                            <InfoLabel>max leechers</InfoLabel>
                            <InfoValue>{info.maxLeech}</InfoValue>
                          </InfoItem>
                          <InfoItem>
                            <InfoLabel>min leechers</InfoLabel>
                            <InfoValue>{info.minLeech}</InfoValue>
                          </InfoItem>
                        </div>
                      )}
                  </InfoGroup>
                </InfoContainer>
                {aggregateSnapshotCount.length > 1 ? (
                  <Chart>
                    <SyncLine
                      syncId="listings"
                      data={info.torrentSnapshots}
                      pluck={[
                        { key: 'seed', color: '#008000' },
                        { key: 'leech', color: '#ff0000' },
                      ]}
                    />
                  </Chart>
                ) : (
                  <div />
                )}
              </Details>
            </Item>
          ))}
      </InfoListContainer>
    </div>
  );
};

export default withTheme(BreakdownListingsInfos);

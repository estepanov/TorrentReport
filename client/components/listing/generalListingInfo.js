import React from 'react';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';
import moment from 'moment';

import SimpleLine from '../charts/simpleLine';
import SeedLeechPie from '../charts/seedLeechPie';
import SectionHeader from '../sectionHeader';

/**
 * STYLES
 */

const InfoContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Column = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Item = styled.div`
  min-width: 200px;
  flex-grow: 1;
  padding: 0.5em;
  margin: 0.5em;
  background-color: ${props => lighten(0.96, props.theme.colors.quinary)};
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
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

const Value = styled.div`
  padding: 0.4em 0em 0em 0em;
  display: inline-flex;
  width: 100%;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const Number = styled.div`
  display: inline;
  font-size: 1.4em;
  padding: 0px;
  margin: 0px;
  line-height: 1.2em;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

/**
 * COMPONENT
 */

const GeneralListingInfo = (props) => {
  const justFullDateFormat = 'MMMM Do YYYY';
  const justTimeFormat = 'h:mm:ss a';
  const { listing, infos, aggregateSnapshotCount } = props;
  return (
    <div>
      <SectionHeader>GENERAL Combined INFO</SectionHeader>
      <InfoContainer>
        <Column>
          <Item>
            <Title>first discovered</Title>
            <Value>
              <div>{moment(listing.createdAt).format(justFullDateFormat)}</div>
              <div>{moment(listing.createdAt).format(justTimeFormat)}</div>
            </Value>
          </Item>
          <Item>
            <Title>uploads found</Title>
            <Value>
              <Number>{infos.length}</Number>
            </Value>
          </Item>
        </Column>
        <Column>
          <Item>
            <Title>peers</Title>
            <Value>
              <Center>
                <SeedLeechPie
                  seed={infos.reduce((accum, curr) => accum + curr.seed, 0)}
                  leech={infos.reduce((accum, curr) => accum + curr.leech, 0)}
                />
              </Center>
            </Value>
          </Item>
        </Column>
        {aggregateSnapshotCount.length > 1 &&
          infos.length && (
            <Column>
              <Item>
                <Title>history</Title>
                <Value>
                  <Center>
                    <SimpleLine
                      data={aggregateSnapshotCount}
                      syncId="listings"
                      pluck={[
                        { key: 'seed', color: '#008000' },
                        { key: 'leech', color: '#ff0000' },
                      ]}
                    />
                  </Center>
                </Value>
              </Item>
            </Column>
          )}
      </InfoContainer>
    </div>
  );
};

export default withTheme(GeneralListingInfo);

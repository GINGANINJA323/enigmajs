import * as React from 'react';
import { Button } from './elements';
import styled from 'styled-components';

interface TabViewProps {
  tabs: { [key: string]: string };
  onChangeTab: (tab: string) => void;
  visibleComponent: string | null;
}

interface TabButtonProps {
  selected: boolean;
}

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TabButton = styled(Button)<TabButtonProps>`  
  padding: 15px;
  font-size: 18px;
  border-radius: 0px;
  background-color: ${(props) => props.selected ? '#2d2d2d' : ''};
  :first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  :last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const TabView = (props: TabViewProps): JSX.Element => {
  return (
    <TabWrapper>
      {
        Object.keys(props.tabs).map(t => 
            <TabButton
              onClick={() => props.onChangeTab(t)}
              key={t}
              selected={props.visibleComponent === t}
            >{props.tabs[t]}
            </TabButton>
          )
      }
    </TabWrapper>
  )
}

export default TabView;
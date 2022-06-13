import * as React from 'react';
import { Button } from './elements';

interface TabViewProps {
  tabs: { [key: string]: string },
  onChangeTab: (tab: string) => void
}

const TabView = (props: TabViewProps): JSX.Element => {
  return (
    <>
      {
        Object.keys(props.tabs).map(t => 
            <Button
              onClick={() => props.onChangeTab(t)}
              key={t}
            >{props.tabs[t]}
            </Button>
          )
      }
    </>
  )
}

export default TabView;
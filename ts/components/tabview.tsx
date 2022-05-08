import * as React from 'react';

interface TabViewProps {
  tabs: { [key: string]: string },
  onChangeTab: (tab: string) => void
}

const TabView = (props: TabViewProps): JSX.Element => {
  return (
    <>
      {
        Object.keys(props.tabs).map(t => 
            <button
              onClick={() => props.onChangeTab(t)}
              key={t}
            >{props.tabs[t]}
            </button>
          )
      }
    </>
  )
}

export default TabView;
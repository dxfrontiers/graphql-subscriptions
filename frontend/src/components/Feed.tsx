import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import {PostComponent} from "./PostComponent";
import {QuakBox} from "./QuakBox";
import {Post, useFetchTimelineQuery, useSubscribeTimelineSubscription} from "../generated/graphql"

export const Feed: React.FC = () => {

  const {data: timelineData} = useFetchTimelineQuery()
  const { data: subscriptionData, loading, error } = useSubscribeTimelineSubscription();
  
  const [timeline, setTimeline] = useState([] as Post[])
  
  useEffect(() => {
    if (timelineData !== undefined)
      setTimeline([...timeline, ...timelineData.timeline])
  },  [timelineData])
  
  useEffect(() => {
    if (subscriptionData !== undefined)
      setTimeline([subscriptionData.onTimelineUpdate, ...timeline])
  }, [subscriptionData])
  
  return (
    <Box>
      <QuakBox />
      {timeline.map((post, index) => {
        // @ts-ignore
        return <PostComponent key={index} post={post}></PostComponent>;
      })}
    </Box>
  );
};

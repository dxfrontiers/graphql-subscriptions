import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  Post,
  useFetchTimelineQuery,
  useSubscribeTimelineSubscription,
} from "../generated/graphql";
import { PostComponent } from "./PostComponent";

export const Feed: React.FC = () => {
  const { data: timelineData } = useFetchTimelineQuery();
  const { data: subscriptionData } = useSubscribeTimelineSubscription();

  const [timeline, setTimeline] = useState([] as Post[]);

  useEffect(() => {
    if (timelineData !== undefined)
      setTimeline([...timeline, ...timelineData.timeline]);
  }, [timelineData]);

  useEffect(() => {
    if (subscriptionData !== undefined)
      setTimeline([subscriptionData.onTimelineUpdate, ...timeline]);
  }, [subscriptionData]);

  return (
    <Box>
      {timeline.map((post, index) => {
        // @ts-ignore
        return <PostComponent key={index} post={post}></PostComponent>;
      })}
    </Box>
  );
};

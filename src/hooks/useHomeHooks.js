import { useEffect, useRef, useState } from "react";

export const useHomeAudio = (getEventsListResponse) => {
    const prevEventsListResRef = useRef(getEventsListResponse);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        if (getEventsListResponse !== prevEventsListResRef.current && getEventsListResponse?.success && getEventsListResponse?.data?.length > 0) {
            prevEventsListResRef.current = getEventsListResponse;
            setEventList(getEventsListResponse?.data)
            // console.log('useHomeAudio => ', eventList)
        }
    }, [getEventsListResponse])

    return eventList;
};
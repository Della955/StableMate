import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { Fragment, useState, useCallback, useMemo, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types'
import { all } from "axios";
import { api } from "../utilities"; 



const locales = {
    "en-US": ("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales 
})


const events =[
        {
            title:"Big Meeting",
            allDay: true, 
            start: new Date(2023, 7, 10),
            end: new Date(2023, 7, 10)
        },
        {
            title:"Vacation",
            start: new Date(2023, 7, 23),
            end: new Date(2023, 7, 25)
        },
        {
            title:"Conference",
            start: new Date(2023, 7, 0,),
            end: new Date(2023, 7, 0)
        }
    ]


export const CalendarPage = () =>{

    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState([])
    const [myEvents, setEvents] = useState(events)
    const [title, setTitle] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("") 

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
          const title = window.prompt('New Event name')
          if (title) {
            setEvents((prev) => [...prev, { start, end, title }])
            events.push({start, end, title})
          }
        },
        
        [setEvents]
       
      )
        console.log("EVENT LIST: ", events)
    //   const handleSelectEvent = useCallback(
    //     (event) => window.alert(event.title),
    //     [setEvents]
    //   )

        useEffect(() => {
        const updateEvents = async() => {
          let mapEvent = events.map((item, index) =>item)
          console.log("Map event: ", mapEvent)
          let response = await api.post("calendar/", {
            title:setTitle(mapEvent.title),
            start_time:setStart(mapEvent.start),
            end_time:setEnd(mapEvent.end)
          })
          let new_event = response.data 
          console.log(new_event)
          setAllEvents(newEvent)

        }
        updateEvents()
      }, [])

      console.log("All events: ", allEvents)

      function onSelectEvent(pEvent) {
        const deleteEvent = window.confirm("Would you like to remove this event?")
        if(deleteEvent === true){
            const idx = events.indexOf(pEvent)
            setEvents(events)
            events.splice(idx, 1);
          
        }
      }
    
      const { defaultDate, scrollToTime } = useMemo(
        () => ({
          defaultDate: new Date(2023, 7, 8),
          scrollToTime: new Date(2000, 1, 1, 6),
        }),
        []
      )

    return(
        <div>
            <h1>Calendar</h1>

            <h2>Click and drag in a time slot to add a new event</h2>
            {/* <div>
                <input type="text" placeholder="Add title" style={{width: "20%", marginRight:"10px"}}
                value={newEvent.title} onChange={(e)=> setNewEvent({...newEvent, title:e.target.value})}
                />
                <DatePicker placeholderText="Start Date" style={{marginRight:"10px"}}
                selected={newEvent.start} onChange={(start)=>setNewEvent({...newEvent, start})} />
                <DatePicker placeholderText="End Date"
                selected={newEvent.end} onChange={(end)=>setNewEvent({...newEvent, end})} />
                <button style={{marginTop:"10px"}} onClick={handleEvent}>Add Event</button>
            </div> */}
            <Calendar 
            localizer={localizer} 
            events={events} 
            startAccessor="start" 
            endAccessor="end"
            defaultView={Views.WEEK}
            defaultDate={defaultDate}
            onSelectEvent={onSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            scrollToTime={scrollToTime}
            min={new Date(2023, 7, 1, 6, 0)}
            step={30}
            style={{height:500, margin:"100px"}}/>
        </div>
        
    )
   
};
CalendarPage.propTypes = {
    localizer: PropTypes.instanceOf(dateFnsLocalizer),
  }
import React, { useState, useEffect } from "react";

const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null
}


const App = () => {
    const [counter, setCounter] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
    const [status, setStatus] = useState(navigator.onLine);
    // instead of "location", we can destructure to latitude, longitude, speed
    const [{ latitude, longitude, speed }, setLocation] = useState(initialLocationState);
    // we need a variable the we can reassign, to handle to remove the event listener from getCurrentPosition
    let mounted = true;

    // useEffect normally runs with every render

    // if we want to run our effect less frequently, we can provide a second argument which is an array of values
    // if we just want to run useEffect run once (on componentDidMount & componentWillUnmount), then we need to pass
    // as a second argument just the empty array
    // if we provide in this array a value, then the useEffect just listen for a change of this value and then renders 
    useEffect(() => {
        document.title = `You have clicked ${counter} times`;
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        // the getCurrentPosition is an example for a method that do not have an easy way to remove the event listener
        // no easy way to unmount
        navigator.geolocation.getCurrentPosition(handleGeolocation);
        // the watchId allows us to keep track of the listener that we set up, in this case watchPosition
        const watchId = navigator.geolocation.watchPosition(handleGeolocation);

        // This is the clean up part:
        // to Clean up side effect, with classes componentWillUnmount() is used
        // here just use return 
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            mounted = false;
            navigator.geolocation.clearWatch(watchId);
        }
    }, [counter])

    const incrementCount = () => {
        setCounter(prevCount => prevCount + 1)
    }

    const toggleLight = () => {
        setIsOn(prevIsOn => !prevIsOn)
    }

    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.pageX,
            y: event.pageY
        })
    }

    const handleOnline = () => {
        setStatus(true);
    }

    const handleOffline = () => {
        setStatus(false);
    }

    const handleGeolocation = (event) => {
        // with if (mounted) we prevent to call setLocation when component is unmounted
        // because this could be the cause of a memory leak
        if (mounted) {
            setLocation({
                latitude: event.coords.latitude,
                longitude: event.coords.longitude,
                speed: event.coords.speed
            })
        }
    }

    return (
        <>
            <h2>Counter</h2>
            <button onClick={incrementCount}>
                I was clicked {counter} times
            </button>

            <h2>Toggle Light</h2>
            <img
                src={
                    isOn
                        ? "https://icon.now.sh/highlight/fd0"
                        : "https://icon.now.sh/highlight/aaa"
                }
                style={{
                    height: "50px",
                    width: "50px"
                }}
                alt="Flaschlight"
                onClick={toggleLight}
            />

            <h2>Mouse Position</h2>
            {JSON.stringify(mousePosition, null, 2)}
            <br />

            <h2>Network Status</h2>
            <p>You are <strong>{status ? "online" : "offline"}</strong></p>

            <h2>Geolocation</h2>
            {/* this was the version before destructuring */}
            {/* <p> Latitude is {location.latitude}</p> */}
            <p> Latitude is {latitude}</p>
            <p>Longitude is {longitude}</p>
            <p>Your speed is {speed ? speed : "0"}</p>
        </>
    );
}

export default App;
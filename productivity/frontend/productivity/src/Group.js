import React, { useEffect,useState } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import {io} from 'socket.io-client';
const WhiteWebSdk = window.WhiteWebSdk


function Group() {
    let localAudioTrack;
    let localVideoTrack;
    let client;
    const userName = Math.random().toString(16).substr(2, 8);
    const uid = String(Math.floor(Math.random() * 10000))
    const [socket,setSocket] =  useState(io('http://localhost:8000'))

    let options = {
        // Pass your App ID here.
        appId: "45f3b24681334785935996d3267b45fa",
        // Set the channel name.
        channel: "test",
        // Pass your temp token here.
        token: "007eJxTYFB5w7PzdqXC6cRNCgeXXLBT+fVsVrDeyltr7x+K9bj4+iOLAoOJaZpxkpGJmYWhsbGJuYWppbGppaVZirGRmXkSUC5Raz9z8ioB1uRFFxhZGBkgEMRnYShJLS5hYAAAxCUgyw==",
        // Set the user ID.
        uid: uid,
        
    };

    const startBasicCall = ()=>{
        // Create an AgoraRTCClient object.
        client = AgoraRTC.createClient({mode:'rtc',codec:'vp8'})


        // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
        client.on('user-published',async (user,mediaType)=>{
            await client.subscribe(user,mediaType)
            console.log("subscribe success",user);
            console.log("mediaType",mediaType)

            // If the remote user publishes a video track.
            if(mediaType === "video"){
                console.log('inside video track man')
                const remoteVideoTrack = user.videoTrack;
                // Dynamically create a container in the form of a DIV element for playing the remote video track.
                const remotePlayerContainer = document.createElement("div");
                // Specify the ID of the DIV container. You can use the uid of the remote user.
                remotePlayerContainer.id = user.uid.toString();
                remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                remotePlayerContainer.style.width = "640px";
                remotePlayerContainer.style.height = "480px";
                document.body.append(remotePlayerContainer);
                // Play the remote video track.
                // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
                remoteVideoTrack.play(remotePlayerContainer);
                
            }

            if(mediaType === "audio"){
                console.log('inside audio track man')
                // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
                const remoteAudioTrack = user.audioTrack;
                console.log('user audioTrack found')
                // Play the remote audio track. No need to pass any DOM element.
                remoteAudioTrack.play();
            }

            
        })
        //Listen for the "user-unpublished" event
        client.on("user-unpublished", user => {
            console.log('user unpublished called')
            // Get the dynamically created DIV container.
            const remotePlayerContainer = document.getElementById(user.uid);
            // Destroy the container.
            if(remotePlayerContainer){

                remotePlayerContainer.remove();
            }
        });
    }

    startBasicCall()
    const join = async (data)=>{
        // Join an RTC channel.
        await client.join(options.appId, options.channel, options.token, options.uid);
        // Create a local audio track from the audio sampled by a microphone.
        localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Create a local video track from the video captured by a camera.
        localVideoTrack = await AgoraRTC.createCameraVideoTrack({
            video: {
                width:{
                    min: 1280,
                    ideal: 1920,
                    max: 2560
                },
                height:{
                    min:720,
                    ideal: 1080,
                    max: 1440
                },
                facingMode: 'user'
            }
        });
        // localVideoTrack =  await AgoraRTC.createScreenVideoTrack();
        // Publish the local audio and video tracks to the RTC channel.
        await client.publish([localAudioTrack, localVideoTrack]);
        // Dynamically create a container in the form of a DIV element for playing the local video track.
        const localPlayerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the uid of the local user.
        localPlayerContainer.id = options.uid;
        localPlayerContainer.textContent = "Local user " + options.uid;
        localPlayerContainer.style.width = "640px";
        localPlayerContainer.style.height = "480px";
        document.body.append(localPlayerContainer);

        // Play the local video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
        localVideoTrack.play(localPlayerContainer);
        console.log("publish success!");
        
    }

    const joinAndBroadCast = async ()=>{
        //it is called implicitly
        console.log(userName)
        join()
        socket.emit('call',{userName:userName})
        document.getElementById('toggle-video').style.display = 'inline-block'
        document.getElementById('join').style.display = 'none'
        document.getElementById('toggle-audio').style.display = 'inline-block'
    }

    const leave = async ()=>{
        // Destroy the local audio and video tracks.
        localAudioTrack.close();
        localVideoTrack.close();

        // Traverse all remote users.
        client.remoteUsers.forEach(user => {
            // Destroy the dynamically created DIV containers.
            const playerContainer = document.getElementById(user.uid);
            playerContainer && playerContainer.remove();
        });

        // Leave the channel.
        await client.leave();
    }


    const toggleVideo = async()=>{

        //used for toggling video
        console.log(localVideoTrack.enabled)
        if(!localVideoTrack.enabled){

            await localVideoTrack.setEnabled(true)
            // await localVideoTrack.on()
            document.getElementById('toggle-video').textContent = "hide video"
        }else{
            await localVideoTrack.setEnabled(false)
            // await localVideoTrack.off()
            document.getElementById('toggle-video').textContent = "show video"
        }
    }

    const toggleAudio = async ()=>{
        //used for toggling video
        console.log(localAudioTrack.enabled)
        if(!localAudioTrack.enabled){

            await localAudioTrack.setEnabled(true)
            document.getElementById('toggle-audio').textContent = "mute"
        }else{
            await localAudioTrack.setEnabled(false)
            document.getElementById('toggle-audio').textContent = "trun on audio"
        }
    }

    useEffect(()=>{
        //roomId will be taken form url
        socket.emit('new-user',{roomId:'room1',userName:userName})

        socket.on('new-chat-message',(data)=>{
            console.log(data)
        })

        //triggers when someone make call 
        socket.on('call',(data)=>{
            
            if (window.confirm(`${data.user} is calling in Group.`)) {
              
                console.log('hello')
                join()
                document.getElementById('toggle-video').style.display = 'inline-block'
                document.getElementById('join').style.display = 'none'
                document.getElementById('toggle-audio').style.display = 'inline-block'
               
            } else {
                console.log('no')
            }
        })

        console.log('inside use effect')

        document.getElementById('toggle-video').style.display = 'none'
        document.getElementById('toggle-audio').style.display = 'none'
        
    },[])

    const sendChatMsg = ()=>{
        socket.emit('new-chat-message',{room:'62fa6d5000f978b05e93808e',userId:'62f28232089b0f8215316d2c',message:'hello i am from react'})
    }


  return (
    <>
        <div>Group</div>
        <div>
            <button type="button" id="join" onClick={joinAndBroadCast}>JOIN</button>
            <button type="button" id="leave" onClick={leave}>LEAVE</button>
            <button type="button" onClick={sendChatMsg}>Send Msg</button>
            <button type="button" id="toggle-video" onClick={toggleVideo}> Stop Video</button>
            <button type="button" onClick={toggleAudio} id="toggle-audio">Mute</button>
        </div>
    
    </>
    
  )
}

export default Group
import React,{
	useState,
	useRef
} from 'react'
import { useEffect } from 'react';
import './GroupCall.css'

import { useLocation, useParams, useSearchParams } from 'react-router-dom';


import AgoraRTC from 'agora-rtc-sdk-ng';

function GroupCall(){

	const videoStreamsRef = useRef(null);

	const uid = String(Math.floor(Math.random() * 10000))

	// const [localVideo,setLocalVideo] = useState(null);
	// const [localAudio,setLocalAudio] = useState(null);
	const [localTracks,setLocalTracks] = useState([]);
	const [client,setClient] = useState(null);
	const [UID,setUID] = useState(null);

	const {meetName} = useParams();
	const name = new URLSearchParams(useLocation().search).get('name')

	const options = {
		appid : "a8937d4fc8ab426bbe0bde9141d1b5d0",
		channelname : "productivity",
		token : "007eJxTYLi7a6526HXbp8FhkWcOf22V3jctdl71g8miptPP9Uxhn/xdgSHRwtLYPMUkLdkiMcnEyCwpKdUgKSXV0tDEMMUwyTTFYH51R3JDICODy6kNDIxQCOLzMBQU5aeUJpdklmWWVDIwAAAxHSWl",
		uid : null
	}

	async function handleUserLeft(user,mediaType){
		console.log('user left handled',user);
		document.getElementById(`user-container-${user.uid}`).remove();
		// createNotification('success',`${user.uid} just left the call`,)
	}

	async function handleUserPublished(user,mediaType){
		console.log('user published handled');
		// remoteUsers[user.uid] = user;
		await client.subscribe(user,mediaType);

		if(mediaType === 'video'){
			let player = document.getElementById(`user-container-${user.uid}`);
			if(player != null) player.remove();

			player = `<div class="video-container" id="user-container-${user.uid}">
						<div class="video-player" id="user-${user.uid}"></div> 
						<span class="username">
							${user.uid}
						</span>
						</div>
					`
			videoStreamsRef.current.insertAdjacentHTML('beforeend',player);
			user.videoTrack.play(`user-${user.uid}`);
		}

		if(mediaType === "audio"){
			// user.audioTrack.play();
		}
	}

	async function joinAndDisplayLocalStream(){

		client.on('user-published',handleUserPublished)
		client.on('user-left',handleUserLeft)
		let UID = await client.join(options.appid, options.channelname, options.token, prompt('enter name'))
	
		setUID(UID);
		console.log('UIDS = ',UID)
		
		setLocalTracks(await AgoraRTC.createMicrophoneAndCameraTracks());
		console.log('localTracks = ',localTracks)
	
		let player = `
			<div class = "video-container self" id = "user-container-${UID}">
				<div class = "video-player" id = "user-${UID}">
	
				</div>
				<span class="username">
					${UID}
				</span>
			</div>
		`;
		videoStreamsRef.current.insertAdjacentHTML('beforeend',player);
		
	}

	async function startCall(){
		console.log('starting call')
		await joinAndDisplayLocalStream();
	}


	useEffect(() => {
		console.log('joining room')
		setClient(AgoraRTC.createClient({
			mode : 'rtc',
			codec : 'vp8'
		}))
	},[])

	useEffect(() => {

		if(client){
			startCall()
		}
		
	},[client])

	useEffect(() => {
		(
			async function(){
				if(localTracks[0] && localTracks[1]){
					console.log('tracks = ',localTracks)
					localTracks[1].play(`user-${UID}`);
					await client.publish([localTracks[0],localTracks[1]]);
				}
			}
		)()
	},[localTracks])

	return(
		<div style = {{
			background : "black"
		}}>
			<h1>{meetName}</h1>
			<div 
				ref = {videoStreamsRef}
				className="video-streams"
			>	
				
			</div>
			<div className="controls">

			</div>
		</div>
	)

}

export default GroupCall;

import React,{
	useState,
	useRef
} from 'react'
import { useEffect } from 'react';
import './GroupCall.css'

import AgoraRTC from 'agora-rtc-sdk-ng';

function GroupCall(){

	const videoStreamsRef = useRef(null);

	const uid = String(Math.floor(Math.random() * 10000))

	// const [localVideo,setLocalVideo] = useState(null);
	// const [localAudio,setLocalAudio] = useState(null);
	const [localTracks,setLocalTracks] = useState([]);
	const [client,setClient] = useState(null);
	const [UID,setUID] = useState(null);

	const options = {
		appid : "a8937d4fc8ab426bbe0bde9141d1b5d0",
		channelname : "productivity",
		token : "007eJxTYOif8qVs9xF7E7GetVkb1HqsWI4Z5H54bHtuxvT7B5555M1QYEi0sDQ2TzFJS7ZITDIxMktKSjVISkm1NDQxTDFMMk0xYGhtT24IZGQwryllYWSAQBCfh6GgKD+lNLkksyyzpJKBAQDczCQo",
		uid : uid
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
		let UID = await client.join(options.appid, options.channelname, options.token, options.uid)
	
		setUID(UID);
		
		setLocalTracks(await AgoraRTC.createMicrophoneAndCameraTracks());
		console.log('localTracks = ',localTracks)
	
		let player = `
			<div class = "video-container" id = "user-container-${UID}">
				<div class = "video-player" id = "user-${UID}">
	
				</div>
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
		<div>
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

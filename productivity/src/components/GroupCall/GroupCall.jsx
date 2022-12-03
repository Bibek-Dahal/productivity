import React,{
	useState,
	useRef
} from 'react'
import { useEffect } from 'react';
import './GroupCall.css'

import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import {Icon} from '@iconify/react'

import AgoraRTC from 'agora-rtc-sdk-ng';

function GroupCall(){

	const videoStreamsRef = useRef(null);
	const displayFrame = useRef(null);

	


	// const [localVideo,setLocalVideo] = useState(null);
	// const [localAudio,setLocalAudio] = useState(null);
	const [localTracks,setLocalTracks] = useState([]);
	const [screenTrack,setScreenTrack] = useState(null);
	const [client,setClient] = useState(null);
	const [UID,setUID] = useState(null);
	const [mutedAudio,setMutedAudio] = useState(false);
	const [mutedVideo,setMutedVideo] = useState(false);
	const [sharingScreen,setSharingScreen] = useState(false);


	const meet = new URLSearchParams(useLocation().search).get('meet')

	const options = {
		appid : "5f89378de401480faa9b01fbc58d2b6f",
		room : meet,
		token : null,
		// channelname : "productivity",
		// token : "007eJxTYLi7a6526HXbp8FhkWcOf22V3jctdl71g8miptPP9Uxhn/xdgSHRwtLYPMUkLdkiMcnEyCwpKdUgKSXV0tDEMMUwyTTFYH51R3JDICODy6kNDIxQCOLzMBQU5aeUJpdklmWWVDIwAAAxHSWl",
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
		let UID = await client.join(options.appid,options.room,null,prompt('username'))
	
		setUID(UID);
		console.log('UIDS = ',UID)
		
		setLocalTracks(await AgoraRTC.createMicrophoneAndCameraTracks({},{
			encoderConfig : {
				width : {min:640,ideal:1920,max:1920},
				height : {min:480,ideal:1080,max:1080},
			}
		}));
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

	function expandVideoFrame(){
		console.log('expanding video frame')
		displayFrame.current.style.display = "block"
		videoStreamsRef.current.classList.add('adjust')
	}

	async function startCall(){
		console.log('starting call')
		await joinAndDisplayLocalStream();
	}

	async function toggleMic(){
		// localTracks[0].muted = true;
		if(localTracks[0].muted){
			await localTracks[0].setMuted(false)
			setMutedAudio(false)
		}else{
			await localTracks[0].setMuted(true)
			setMutedAudio(true);
		}
	}

	async function toggleVideo(){
		// if(localTracks[1].enabled){
		// 	localTracks[1].enabled = false;
		// 	setMutedVideo(true);
		// }
		if(localTracks[1].muted){
			await localTracks[1].setMuted(false)
			setMutedVideo(false)
		}else{
			await localTracks[1].setMuted(true)
			setMutedVideo(true);
		}
		// localTracks[1].muted = !localTracks[1].muted;
	}

	async function shareScreen(){
		const screenStream = await AgoraRTC.createScreenVideoTrack({},{
			encoderConfig : {
				width : {min:640,ideal:1920,max:1920},
				height : {min:480,ideal:1080,max:1080},
			}
		});
		setScreenTrack(screenStream);
		await client.publish(screenStream)


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
			background : "#202025"
		}}>
			<div className="large-stream" ref = {displayFrame}></div>
			<div 
				ref = {videoStreamsRef}
				className="video-streams"
			>	
				
			</div>
			<div className="controls">
				<div className="share-link">
					{meet}
				</div>
				<div className="controllers">
					<button 
						className={`${mutedAudio ? "muted" : ""} mic`}
						onClick = {toggleMic}
					>
						{
							!mutedAudio ?
								<Icon icon = "material-symbols:mic" />:
								<Icon icon = "material-symbols:mic-off" />
						}
					</button>
					<button 
						className={`${mutedVideo ? "muted" : ""} camera`}
						onClick = {toggleVideo}
					>
						{
							!mutedVideo ?
								<Icon icon = "material-symbols:video-camera-back-rounded" />:
								<Icon icon = "material-symbols:video-camera-front-off" />
						}
						{/* mic off material-symbols:mic-off */}
					</button>
					<button 
						className={`${sharingScreen ? "muted" : ""} share-screen`}
						onClick = {shareScreen}
					>
						<Icon icon = "lucide:screen-share" />
						{/* camera off   material-symbols:video-camera-front-off*/}
					</button>
					<button 
						className="exit"
						onClick = {toggleMic}
					>
						<Icon icon = "material-symbols:phone-enabled-sharp" />
					</button>
				</div>
			</div>
		</div>
	)

}

export default GroupCall;

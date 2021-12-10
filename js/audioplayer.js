function AudioPlayer(){
    return {
        create_ui:function(element){
            this.selector=document.createElement("div");
            this.selector.className="audioplayer";
            element.appendChild(this.selector);
            var play=document.createElement("div");
            play.className="audioplayer-play-paused";
            play.addEventListener("click",function(){
                if(this.className=="audioplayer-play-paused"){
                    this.className="audioplayer-play-playing";
                    document.querySelector(".audioplayer-object").play();
                }else{
                    this.className="audioplayer-play-paused";
                    document.querySelector(".audioplayer-object").pause();
                }
            });
            this.selector.append(play);
            var tip=document.createElement("div");
            tip.className="audioplayer-tip";
            tip.innerText="LIVE";
            this.selector.append(tip);
            var volume=document.createElement("div");
            volume.className="audioplayer-volume";
            this.selector.append(volume);
            volume.addEventListener("mouseover",function(){
                document.querySelector(".audioplayer-volume-seeker").style.display="inline-block";
            });
            volume.addEventListener("mouseout",function(){
                document.querySelector(".audioplayer-volume-seeker").style.display="none";
            });
            var vlen=document.createElement("input");
            vlen.className="audioplayer-volume-seeker";
            vlen.type="range";
            vlen.min=0;
            vlen.max=100;
            vlen.value=100;
            vlen.addEventListener("change",function(){
                document.querySelector(".audioplayer-object").volume=vlen.value/100;
                if(vlen.value==0){
                    document.querySelector(".audioplayer-volume").className="audioplayer-volume-muted";
                }else{
                    if(document.querySelector(".audioplayer-volume-muted")){ //Muted to Non-muted
                        document.querySelector(".audioplayer-volume-muted").className="audioplayer-volume";
                    }
                }
            });
            volume.append(vlen);
        },
        init:function(url){
            if(url.indexOf(".mp3")!=-1){ //MP3 stream media
                this.object=document.createElement("audio");
                this.object.className="audioplayer-object";
                this.object.controls=null;
                this.object.src=url;
                this.object.autoplay=true;
                this.selector.append(this.object);
            }else{ //HLS stream media
                if(typeof(window.Hls)===undefined){
                    throw "[AudioPlayer] Error when initalize player: Play HLS video need to use hls.js, but there didn't imported.";
                }
                this.object=document.createElement("video");
                this.object.className="audioplayer-object";
                this.object.controls=null;
                if(window.Hls.isSupported()){ //Can play HLS by MediaExtension
                    this.player=new window.Hls();
                    this.player.loadSource(url);
                    this.player.attachMedia(this.object);
                }else{ //In safari,play at system. 
                    this.object=document.createElement("audio");
                    this.object.className="audioplayer-object";
                    this.object.src=url;
                    this.object.controls=null;
                    this.selector.append(this.object);
                }
            }
        },
        play:function(){
            this.selector.append(this.object);
        }
    };
}
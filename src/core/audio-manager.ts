const BASE='/audio/generated/';
const MUSIC={menu:['music-menu-01.mp3','music-menu-02.mp3'],game:['music-game-01.mp3','music-game-02.mp3']};
const SFX:Record<string,string|string[]>={eat:['eat-01.mp3','eat-02.mp3','eat-03.mp3'],pickup:'skill-pickup.mp3',global_eat:'skill-global-eat.mp3',type_eat:'skill-type-eat.mp3',speed_up:'skill-speed-up.mp3',grow:'skill-grow.mp3',heal:'skill-heal.mp3',invincible:'skill-invincible.mp3',hit:'hit.mp3',gameOver:'game-over.mp3'};
let music:HTMLAudioElement|null=null,scene='',sfxIndex=0;
export function playMusic(next:'menu'|'game'){if(scene===next&&music)return;scene=next;if(music){music.pause();music.src=''}music=new Audio();music.volume=.3;let index=0;const play=()=>{if(!music)return;music.src=BASE+MUSIC[next][index++%MUSIC[next].length];music.play().catch(()=>{});};music.onended=play;play()}
export function playSfx(name:string){const source=SFX[name];if(!source)return;const list=Array.isArray(source)?source:[source];const audio=new Audio(BASE+list[sfxIndex++%list.length]);audio.volume=.62;audio.play().catch(()=>{})}

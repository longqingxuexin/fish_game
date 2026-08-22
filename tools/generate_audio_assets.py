from pathlib import Path
import math, struct, wave

OUT = Path(__file__).resolve().parents[1] / "public" / "audio" / "generated"
RATE = 22050

def tone(path, seconds, notes, volume=0.22, pulse=False):
    frames = []
    total = int(seconds * RATE)
    for i in range(total):
        t = i / RATE
        value = 0.0
        for start, duration, freq in notes:
            if start <= t < start + duration:
                local = (t - start) / duration
                env = min(1.0, local * 35) * min(1.0, (1.0 - local) * 18)
                value += math.sin(2 * math.pi * freq * t) * env
        if pulse:
            value *= 0.72 + 0.28 * math.sin(2 * math.pi * 2.2 * t)
        frames.append(struct.pack('<h', int(max(-1, min(1, value * volume)) * 32767)))
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), 'wb') as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(RATE); f.writeframes(b''.join(frames))

def melody(path, root):
    seq = [root, root*1.25, root*1.5, root*1.25, root*1.12, root*1.5, root*1.68, root*1.5]
    notes = [(i*0.5, 0.46, n) for i, n in enumerate(seq)]
    notes += [(i*0.5, 0.46, n/2) for i, n in enumerate(seq)]
    tone(path, 8.0, notes, 0.18, True)

music = {"menu-01": 220, "menu-02": 247, "game-01": 196, "game-02": 175}
for name, root in music.items(): melody(OUT / f"music-{name}.wav", root)

sfx = {
    "eat-01": [(0, .10, 520), (.08, .10, 740)], "eat-02": [(0, .08, 620), (.06, .12, 880)],
    "eat-03": [(0, .14, 460), (.10, .08, 700)], "skill-pickup": [(0, .10, 500), (.09, .18, 1000)],
    "skill-global-eat": [(0, .35, 180), (.08, .25, 360)], "skill-type-eat": [(0, .12, 460), (.12, .12, 620), (.24, .16, 820)],
    "skill-speed-up": [(0, .28, 260), (.05, .25, 900)], "skill-grow": [(0, .45, 330), (.10, .35, 660)],
    "skill-heal": [(0, .14, 520), (.12, .22, 780)], "skill-invincible": [(0, .30, 250), (.12, .22, 520)],
    "hit": [(0, .18, 120)], "game-over": [(0, .18, 330), (.16, .35, 165)],
}
for name, notes in sfx.items(): tone(OUT / f"{name}.wav", max(.28, max(s+d for s,d,_ in notes)+.04), notes, .25)

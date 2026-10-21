# Synthesized upbeat promo bed (120 BPM): pads, driving bass, four-on-the-floor kick,
# claps on 2 and 4, 16th hats and a plucked arpeggio. 48kHz stereo.
import numpy as np, json, wave
tl = json.load(open("timeline.json")); T = tl["total"] + 0.5
SR = 48000; n = int(T * SR); t = np.arange(n) / SR
bpm = 120; beat = 60 / bpm; bar = beat * 4
rng = np.random.default_rng(5)
note = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]  # Am F C G
L = np.zeros(n); R = np.zeros(n)
def put(start, sig, pan=0.5):
    a = int(start * SR)
    if a >= n: return
    b = min(n, a + len(sig)); L[a:b] += sig[:b - a] * (1 - pan) * 2 ** .5 * .7; R[a:b] += sig[:b - a] * pan * 2 ** .5 * .7
def seg(d): return np.arange(int(d * SR)) / SR
nbars = int(T / bar) + 1
for i in range(nbars):
    s0 = i * bar; ch = prog[(i // 2) % 4]
    u = seg(bar + .3); env = np.minimum(1, u / .3) * np.exp(-np.maximum(0, u - bar) * 6)
    for k, m in enumerate(ch):  # pad
        f = note(m)
        put(s0, (np.sin(2*np.pi*f*u) + .3*np.sin(2*np.pi*f*2.004*u)) * env * .035, .3 + .2 * k)
    for j in range(4):
        bs = s0 + j * beat
        u = seg(beat)
        put(bs, np.sin(2*np.pi*(45 + 110*np.exp(-u*35))*u) * np.exp(-u*9) * .5)               # kick
        put(bs + beat/2, np.tanh(3*np.sin(2*np.pi*note(ch[0]-24)*u[:int(SR*beat/2)])) * np.exp(-u[:int(SR*beat/2)]*6) * .12)  # off-beat bass
        if j in (1, 3):
            cu = seg(.25); clap = rng.standard_normal(len(cu)) * np.exp(-cu*22) * .16
            put(bs, np.diff(np.concatenate([[0], clap])) * 2.2)
        for h in range(4):
            hu = seg(.05); hat = np.diff(np.concatenate([[0], rng.standard_normal(len(hu))])) * np.exp(-hu*90) * (.05 if h % 2 else .025)
            put(bs + h * beat / 4, hat, .65)
    if i >= 2:  # plucked arpeggio, enters after the intro
        arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12]
        for q in range(8):
            pu = seg(beat / 2); f = note(arp[q % 4])
            put(s0 + q * beat / 2, (np.sin(2*np.pi*f*pu) + .4*np.sin(2*np.pi*2*f*pu)) * np.exp(-pu*14) * .05, .35 if q % 2 else .65)
fade = np.minimum(1, t / 1.0) * np.minimum(1, (T - t) / 3.0)
st = np.stack([L * fade, R * fade], 1); st /= np.abs(st).max() / 0.85
w = wave.open("music.wav", "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype("<i2").tobytes()); w.close()
print("music", T)

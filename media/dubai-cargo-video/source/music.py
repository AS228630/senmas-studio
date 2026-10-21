# Synthesized modern corporate bed: warm pad chords + soft pulse + light hats. 48kHz stereo.
import numpy as np, json, wave
tl = json.load(open("timeline.json")); T = tl["total"] + 0.5
SR = 48000; n = int(T * SR); t = np.arange(n) / SR
bpm = 100; beat = 60 / bpm; bar = beat * 4
def note(m): return 440 * 2 ** ((m - 69) / 12)
prog = [[57, 60, 64, 69], [53, 57, 60, 65], [48, 52, 55, 60], [55, 59, 62, 67]]  # Am F C G
L = np.zeros(n); R = np.zeros(n)
for i in range(int(T / (bar * 2)) + 1):
    s0 = i * bar * 2; ch = prog[i % 4]
    a, b = int(s0 * SR), min(n, int((s0 + bar * 2 + 0.6) * SR))
    if a >= n: break
    tt = t[a:b] - s0
    env = np.minimum(1, tt / 0.8) * np.exp(-np.maximum(0, tt - bar * 2) * 4)
    for k, m in enumerate(ch):
        f = note(m)
        v = (np.sin(2*np.pi*f*tt) + 0.35*np.sin(2*np.pi*f*2.003*tt) + 0.15*np.sin(2*np.pi*f*3*tt)) * env * 0.05
        L[a:b] += v * (0.6 + 0.1*k); R[a:b] += v * (0.9 - 0.1*k)
    # bass on each beat
    for j in range(8):
        bs = s0 + j * beat; ba, bb = int(bs * SR), min(n, int((bs + beat) * SR))
        if ba >= n: break
        u = t[ba:bb] - bs
        bv = np.sin(2*np.pi*note(ch[0]-24)*u) * np.exp(-u*5) * 0.16
        L[ba:bb] += bv; R[ba:bb] += bv
        # soft kick
        kk = np.sin(2*np.pi*(50 + 90*np.exp(-u*30))*u) * np.exp(-u*12) * (0.22 if j % 2 == 0 else 0.0)
        L[ba:bb] += kk; R[ba:bb] += kk
        # off-beat hat
        hs = bs + beat/2; ha, hb = int(hs*SR), min(n, int((hs+0.06)*SR))
        if ha < n:
            hv = np.random.default_rng(j+i*8).standard_normal(hb-ha) * np.exp(-(t[ha:hb]-hs)*80) * 0.03
            hv = np.diff(np.concatenate([[0], hv]))
            L[ha:hb] += hv; R[ha:hb] += hv
# riser into the intro hit + fade
fade = np.minimum(1, t / 1.5) * np.minimum(1, (T - t) / 3.0)
L *= fade; R *= fade
st = np.stack([L, R], 1); st /= np.abs(st).max() / 0.8
w = wave.open("music.wav", "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype("<i2").tobytes()); w.close()
print("music", T)

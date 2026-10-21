# Music-only soundtrack: music bed + a soft whoosh at each scene change + a gentle hit on the logo.
import numpy as np, json, wave
tl = json.load(open("timeline.json"))
SR = 48000
import sys
w = wave.open(sys.argv[1] if len(sys.argv) > 1 else "music.wav"); mus = np.frombuffer(w.readframes(w.getnframes()), "<i2").reshape(-1, 2).astype(float) / 32767
n = len(mus); out = mus * 0.9
W_GAIN = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
rng = np.random.default_rng(1)
def add(start, sig):
    a = int(start * SR); b = min(n, a + len(sig))
    if a < n: out[a:b] += sig[:b - a]
def whoosh(d=0.9):
    m = int(d * SR); t = np.arange(m) / SR
    noise = rng.standard_normal(m)
    # sweep a simple one-pole low-pass cutoff up then down
    cut = 300 + 5000 * np.sin(np.pi * t / d) ** 2
    y = np.zeros(m); acc = 0.0
    for i in range(m):
        al = 1 - np.exp(-2 * np.pi * cut[i] / SR); acc += al * (noise[i] - acc); y[i] = acc
    env = np.sin(np.pi * t / d) ** 2 * 0.22
    pan = t / d
    return np.stack([y * env * (1 - pan * .6), y * env * (.4 + pan * .6)], 1)
def hit():
    m = int(2.5 * SR); t = np.arange(m) / SR
    s = (np.sin(2*np.pi*55*t) * np.exp(-t*3) * .5 + sum(np.sin(2*np.pi*f*t) * np.exp(-t*1.6) for f in (880, 1318.5, 1760)) * .06)
    return np.stack([s, s], 1)
W = whoosh()
for s in tl["scenes"][1:]:
    add(s["start"] - 0.45, W * W_GAIN)
add(0.25, hit()); add(tl["scenes"][-1]["start"], hit() * .8)
out /= np.abs(out).max() / 0.89
w = wave.open("soundtrack.wav", "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out * 32767).astype("<i2").tobytes()); w.close()

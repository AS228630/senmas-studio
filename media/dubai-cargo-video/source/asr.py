import sys, subprocess, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel("medium", device="cpu", compute_type="int8")
for f in sys.argv[1:]:
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True).stdout
    segs, _ = m.transcribe(np.frombuffer(raw, np.float32), language="fa", beam_size=5)
    print(f, "|", " ".join(s.text for s in segs).strip(), flush=True)

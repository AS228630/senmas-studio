import ctypes, sys, wave, espeakng_loader as L
lib = ctypes.CDLL(L.get_library_path())
CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p)
buf = bytearray()
SR = None
@CB
def cb(wav, n, ev):
    if wav and n > 0: buf.extend(ctypes.string_at(wav, n*2))
    return 0
def synth(text, out, voice="fa", rate=150, pitch=40):
    buf.clear()
    global SR
    if SR is None: SR = lib.espeak_Initialize(1, 0, L.get_data_path().encode(), 0)
    sr = SR
    lib.espeak_SetSynthCallback(cb)
    lib.espeak_SetVoiceByName(voice.encode())
    lib.espeak_SetParameter(1, rate, 0); lib.espeak_SetParameter(3, pitch, 0)
    t = text.encode("utf-8")
    lib.espeak_Synth(t, len(t)+1, 0, 0, 0, 0x01 , None, None)  # espeakCHARS_UTF8
    lib.espeak_Synchronize()
    with wave.open(out, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(bytes(buf))
if __name__ == "__main__":
    synth(sys.argv[1], sys.argv[2], *( [sys.argv[3]] if len(sys.argv)>3 else []))

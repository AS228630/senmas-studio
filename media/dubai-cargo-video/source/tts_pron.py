# Announcer-style narration: diacritics on names that TTS tends to misread.
import json, subprocess, os, sys
VOICE, RATE, PITCH = sys.argv[1], sys.argv[2], sys.argv[3]
PREFIX = sys.argv[4] if len(sys.argv) > 4 else "d"
say = {
 "intro":"شرکت باربریِ برادران صداقت. حمل سریع، ایمن و مطمئن!",
 "hook":"آیا قصد دارید اموال و لوازم منزلِ خود را، از ایران به افغانستان بفرستید؟ ما در کنارِ شما هستیم!",
 "route":"انتقالِ اموالِ شما، از تهران به سراسرِ افغانستان!",
 "brand":"مسئولِ باربری، عَبدُالقَدیرِ نیازی!",
 "promise":"بارِ شما، مسئولیتِ ماست! تضمینِ سلامتِ بار، تحویلِ به‌موقع، بیمه‌نامهٔ معتبر، قیمتِ مناسب و منصفانه، و خدماتِ بیست‌وچهار ساعته!",
 "cargo":"پذیرشِ انواعِ بار! بارِ تجاری، بارِ مهاجرین، لوازمِ خانگی، پوشاک و منسوجات، قطعات و ماشین‌آلات، و مصالحِ ساختمانی. هر نوع بار پذیرفته می‌شود!",
 "items":"یخچال، تلویزیون، اُجاقِ گاز، جاروبرقی، و سایرِ وسایلِ برقی!",
 "packing":"اجناسِ شما با دقت بسته‌بندی، برچسب‌گذاری، و با احتیاطِ کامل بارگیری می‌شود!",
 "process":"مراحلِ ارسال بسیار ساده است! اول، با ما تماس بگیرید. دوم، بسته‌بندیِ اجناس. سوم، بارگیری و حمل. و در آخر، تحویل در مقصد!",
 "services":"خدمات ما: حمل اثاثیه منزل، حمل بار بین‌شهری، بسته‌بندی تخصصی، و بیمه بار!",
 "cities":"ارسال به سراسرِ افغانستان! کابُل، هِرات، مَزارِ شریف، قَندَهار، جلال‌آباد، و قُندوز!",
 "social":"ما را در اینستاگرام دنبال کنید، و از وب‌سایتِ ما دیدن کنید!",
 "contact":"همین حالا تماس بگیرید! صفر نهصد و نوزده، چهارصد و پنجاه و هفت، هفتاد، بیست و پنج. و صفر نهصد و نوزده، پانصد و چهارده، نود و سه، بیست و هشت.",
 "whatsapp":"برای اطلاع از قیمت و زمانِ ارسال، در واتساپ به ما پیام بدهید! کافیست کد را با گوشی اسکن کنید.",
 "address":"آدرسِ ما: تهران، خیابانِ خاوران، نرسیده به میدانِ آفانور، خیابانِ شرکتِ واحد، کوچهٔ پاسکول گُل، از دستِ راست.",
 "outro":"شرکتِ باربریِ برادرانِ صداقت. بارِ شما، مسئولیتِ ماست!",
}
ids = ["intro","hook","route","brand","promise","cargo","items","packing","process","services","cities","social","contact","whatsapp","address","outro"]
only = os.environ.get("ONLY", "").split(",") if os.environ.get("ONLY") else ids
env = dict(os.environ, SSL_CERT_FILE="/root/.ccr/ca-bundle.crt")
for i in only:
    for attempt in range(3):
        r = subprocess.run(["edge-tts", "--proxy", os.environ["HTTPS_PROXY"], "--voice", VOICE, f"--rate={RATE}", f"--pitch={PITCH}", "--volume=+15%",
                            "--text", say[i], "--write-media", f"{PREFIX}_{i}.mp3"], env=env, capture_output=True)
        if r.returncode == 0 and os.path.getsize(f"{PREFIX}_{i}.mp3") > 1000: break
    print(i, r.returncode)
json.dump([{"id": i, "say": say[i]} for i in ids], open("scenes.json", "w"), ensure_ascii=False, indent=1)

# Announcer-style narration: diacritics on names that TTS tends to misread.
import json, subprocess, os, sys
VOICE, RATE, PITCH = sys.argv[1], sys.argv[2], sys.argv[3]
PREFIX = sys.argv[4] if len(sys.argv) > 4 else "d"
say = {
 "intro":"برادرانِ صداقت! اکسپرس و کارگو!",
 "hook":"آیا قصد دارید اموال و لوازم منزلِ خود را، از ایران به افغانستان بفرستید؟ ما در کنارِ شما هستیم!",
 "route":"انتقالِ اموالِ شما، از تهران به سراسرِ افغانستان!",
 "brand":"مَحصولِ بار، عَبدُالقَدیرِ نیازی!",
 "promise":"سریع! با قیمتِ مناسب! و در کمترین زمان!",
 "cargo":"پذیرشِ انواعِ بار! بارِ تجار، اثاثیهٔ مهاجرین، لوازمِ خانگی، پوشاک و منسوجات، قطعات و ماشین‌آلات، و مصالحِ ساختمانی. هر نوع بار پذیرفته می‌شود!",
 "items":"یخچال، تلویزیون، اُجاقِ گاز، جاروبرقی، و سایرِ وسایلِ برقی!",
 "packing":"اجناسِ شما با دقت بسته‌بندی، برچسب‌گذاری، و با احتیاطِ کامل بارگیری می‌شود!",
 "process":"مراحلِ ارسال بسیار ساده است! اول، با ما تماس بگیرید. دوم، بسته‌بندیِ اجناس. سوم، بارگیری و حمل. و در آخر، تحویل در مقصد!",
 "services":"تحویلِ سریع! بسته‌بندیِ مطمئن! امن و مطمئن! خدماتِ حرفه‌ای! پیگیریِ آنلاین! و پشتیبانیِ بیست‌وچهار ساعته!",
 "cities":"ارسال به سراسرِ افغانستان! کابُل، هِرات، مَزارِ شریف، و قَندَهار!",
 "tracking":"در تمامِ مسیر، از وضعیتِ بارِ خود باخبر هستید! و پشتیبانیِ ما، شبانه‌روز پاسخگوی شماست!",
 "contact":"همین حالا تماس بگیرید! صفر نهصد و نوزده، پانصد و چهارده، نود و سه، بیست و هشت. و صفر نهصد و نوزده، چهارصد و پنجاه و هفت، هفتاد، بیست و پنج!",
 "whatsapp":"برای اطلاع از قیمت و زمانِ ارسال، همین امروز در واتساپ به ما پیام بدهید!",
 "address":"آدرس: ایران، تهران، خیابانِ شرکتِ آیَت، نَبشِ باسکول.",
 "outro":"برادرانِ صداقت. اعتمادِ شما، سرمایهٔ ماست!",
}
ids = ["intro","hook","route","brand","promise","cargo","items","packing","process","services","cities","tracking","contact","whatsapp","address","outro"]
only = os.environ.get("ONLY", "").split(",") if os.environ.get("ONLY") else ids
env = dict(os.environ, SSL_CERT_FILE="/root/.ccr/ca-bundle.crt")
for i in only:
    for attempt in range(3):
        r = subprocess.run(["edge-tts", "--proxy", os.environ["HTTPS_PROXY"], "--voice", VOICE, f"--rate={RATE}", f"--pitch={PITCH}", "--volume=+15%",
                            "--text", say[i], "--write-media", f"{PREFIX}_{i}.mp3"], env=env, capture_output=True)
        if r.returncode == 0 and os.path.getsize(f"{PREFIX}_{i}.mp3") > 1000: break
    print(i, r.returncode)
json.dump([{"id": i, "say": say[i]} for i in ids], open("scenes.json", "w"), ensure_ascii=False, indent=1)

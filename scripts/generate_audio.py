import asyncio
import os
import re
import sys
import subprocess
import shutil

# Narration script per scene
SCENES = [
    {
        "id": "hook",
        "title": "01 // THE HOOK",
        "text": "Every app you use — Instagram, Spotify, your calculator app — is built on one simple idea. It's called a variable. And in the next few minutes, you'll actually understand it."
    },
    {
        "id": "whatIs",
        "title": "02 // WHAT IS A VARIABLE",
        "text": "Think of a variable as a labeled box. The label is its name. Whatever's inside the box — a number, a word, anything — that's its value. You give the box a name so you can find it again later, without caring exactly where it lives in memory."
    },
    {
        "id": "declareAssign",
        "title": "03 // DECLARING & ASSIGNING",
        "text": "Creating one is called declaring. And putting something inside it is called assigning. Watch: we write let score equals zero. Let declares the box. The equals sign isn't math here — it means put this value inside. Now score holds zero, and we can use that name anywhere in our code."
    },
    {
        "id": "namingRules",
        "title": "04 // NAMING RULES",
        "text": "Names matter. Score tells you what's inside. X doesn't. The rules are simple: no spaces, don't start with a number, and skip words your language already uses, like let itself. Good names are the difference between code you understand in six months, and code you have to relearn from scratch."
    },
    {
        "id": "reassignment",
        "title": "05 // REASSIGNMENT",
        "text": "Here's the key idea in the name itself: variables can vary. The box stays, the label stays — but what's inside can change. Score equals zero. Then later, score equals ten. Same box. New value. The old value is just gone, replaced."
    },
    {
        "id": "dataTypes",
        "title": "06 // DATA TYPES",
        "text": "And boxes don't just hold numbers. A name could hold text, like your username. It could hold true or false, called a boolean — perfect for yes-or-no questions like is logged in. It could even hold a whole list of things. Same idea every time: a name, pointing at a value."
    },
    {
        "id": "recap",
        "title": "07 // RECAP",
        "text": "So: a variable is a labeled box. You declare it, you assign a value, and that value can change any time. That's it — that's the idea every single program is built on. Follow for the next concept: functions."
    }
]

VOICE = "en-US-ChristopherNeural"
FPS = 30

def check_edge_tts():
    try:
        import edge_tts
        return True
    except ImportError:
        print("[*] Installing edge-tts and mutagen for free high-quality neural voiceover...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts", "mutagen"])
        return True

async def generate_scene_audio(scene, temp_dir):
    import edge_tts
    out_file = os.path.join(temp_dir, f"{scene['id']}.mp3")
    communicate = edge_tts.Communicate(scene["text"], VOICE, rate="-3%", pitch="+0Hz")
    await communicate.save(out_file)
    return out_file

def get_audio_duration(file_path):
    try:
        from mutagen.mp3 import MP3
        audio = MP3(file_path)
        return audio.info.length
    except Exception:
        try:
            cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file_path]
            out = subprocess.check_output(cmd).decode().strip()
            return float(out)
        except Exception:
            return 0.0

async def main():
    check_edge_tts()
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    public_dir = os.path.join(project_dir, "public")
    temp_dir = os.path.join(project_dir, "temp_audio")
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(temp_dir, exist_ok=True)

    print(f"[*] Generating voiceover using voice: {VOICE}...")
    scene_durations = {}
    
    combined_script = ""
    for scene in SCENES:
        print(f"  -> Generating Scene: {scene['title']}...")
        mp3_path = await generate_scene_audio(scene, temp_dir)
        dur = get_audio_duration(mp3_path)
        adjusted_dur = round(dur + 0.8, 1)
        scene_durations[scene["id"]] = adjusted_dur
        print(f"     Duration: {dur:.2f}s (Allocated scene time: {adjusted_dur:.1f}s)")
        combined_script += scene["text"] + " ... "

    print("\n[*] Generating master voiceover file: public/voiceover.mp3...")
    import edge_tts
    master_file = os.path.join(public_dir, "voiceover.mp3")
    master_comm = edge_tts.Communicate(combined_script, VOICE, rate="-3%")
    await master_comm.save(master_file)
    
    total_sec = sum(scene_durations.values())
    print(f"\n[OK] Audio generated successfully! Total duration: ~{total_sec/60:.1f} minutes ({total_sec:.1f}s)")
    
    tokens_path = os.path.join(project_dir, "src", "tokens.ts")
    if os.path.exists(tokens_path):
        with open(tokens_path, "r", encoding="utf-8") as f:
            tokens_content = f.read()

        new_scene_seconds = "export const SCENE_SECONDS = {\n"
        for scene in SCENES:
            sid = scene["id"]
            sec = scene_durations.get(sid, 15)
            new_scene_seconds += f'  {sid}: {sec},\n'
        new_scene_seconds += "};"

        updated = re.sub(r"export const SCENE_SECONDS = \{[\s\S]*?\};", new_scene_seconds, tokens_content)
        with open(tokens_path, "w", encoding="utf-8") as f:
            f.write(updated)
        print("[OK] Updated src/tokens.ts with exact scene durations!")

    shutil.rmtree(temp_dir, ignore_errors=True)
    print("\n[OK] Done! You can now run 'npm start' to preview in Remotion Studio.")

if __name__ == "__main__":
    asyncio.run(main())

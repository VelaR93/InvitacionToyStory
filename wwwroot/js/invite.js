// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

(() => {
    // ===== Index: set flag before navigation =====
    const btnStart = document.getElementById("btnStart");
    if (btnStart) {
        btnStart.addEventListener("click", () => {
            // No reproducimos audio aquí. Solo marcamos que el usuario hizo click.
            sessionStorage.setItem("startAudioOnInvite", "1");
        });
    }

    // ===== Invitacion: attempt autoplay on load =====
    const audio = document.getElementById("bgAudio");
    const btn = document.getElementById("btnMute");
    if (!audio || !btn) return;

    let started = false;

    function setBtn(text, pressed) {
        btn.textContent = text;
        btn.setAttribute("aria-pressed", String(pressed));
    }

    async function tryPlay() {
        try {
            audio.loop = true;
            audio.volume = 0.35;
            audio.muted = false;

            await audio.play();
            started = true;
            setBtn("Silenciar música", false);
            return true;
        } catch (e) {
            console.warn("Autoplay blocked:", e);
            started = false;
            setBtn("Activar música", true);
            return false;
        }
    }

    // Estado inicial
    setBtn("Activar música", true);

    // Si venimos desde "Iniciar la aventura", intentamos reproducir al cargar
    if (sessionStorage.getItem("startAudioOnInvite") === "1") {
        sessionStorage.removeItem("startAudioOnInvite");
        window.addEventListener("load", () => {
            tryPlay();
        });
    }

    // Respaldo: botón inicia o mutea
    btn.addEventListener("click", async () => {
        if (!started) {
            await tryPlay();
            return;
        }
        const willMute = !audio.muted;
        audio.muted = willMute;
        setBtn(willMute ? "Activar música" : "Silenciar música", willMute);
    });
})();

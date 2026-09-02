(() => {
  const initialize = (card) => {
    if (card.dataset.shareReady === "true") return;
    card.dataset.shareReady = "true";

    const url = card.dataset.shareUrl;
    const title = card.dataset.shareTitle;
    const text = card.dataset.shareText;
    const nativeButton = card.querySelector("[data-paper-share-native]");
    const nativeNote = card.querySelector("[data-paper-share-native-note]");
    const copyButton = card.querySelector("[data-paper-share-copy]");

    if (nativeButton && navigator.share) {
      nativeButton.hidden = false;
      if (nativeNote) nativeNote.hidden = false;
      nativeButton.addEventListener("click", async () => {
        try {
          await navigator.share({ title, text, url });
        } catch (error) {
          if (error.name !== "AbortError") console.warn("Native sharing failed", error);
        }
      });
    }

    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(url);
        } catch (_) {
          const fallback = document.createElement("textarea");
          fallback.value = url;
          fallback.setAttribute("readonly", "");
          fallback.style.position = "fixed";
          fallback.style.opacity = "0";
          document.body.appendChild(fallback);
          fallback.select();
          document.execCommand("copy");
          fallback.remove();
        }

        const label = copyButton.querySelector("span");
        const defaultLabel = copyButton.dataset.labelDefault;
        label.textContent = copyButton.dataset.labelCopied;
        copyButton.classList.add("is-copied");
        window.setTimeout(() => {
          label.textContent = defaultLabel;
          copyButton.classList.remove("is-copied");
        }, 1800);
      });
    }
  };

  const initializeAll = () => document.querySelectorAll("[data-paper-share]").forEach(initialize);
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", initializeAll, { once: true })
    : initializeAll();
})();

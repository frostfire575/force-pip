// Force Picture-in-Picture
// 1) Strips the "disablepictureinpicture" block from every <video> (and re-strips if the site re-adds it).
// 2) Alt+P toggles PiP on the best video on the page.

function unblock(v) {
  if (v.hasAttribute("disablepictureinpicture") || v.disablePictureInPicture) {
    v.removeAttribute("disablepictureinpicture");
    v.disablePictureInPicture = false;
  }
}

function unblockAll(root) {
  (root.querySelectorAll ? root.querySelectorAll("video") : []).forEach(unblock);
}

// Watch for new videos and for sites re-adding the attribute.
new MutationObserver((mutations) => {
  for (const m of mutations) {
    if (m.type === "attributes" && m.target instanceof HTMLVideoElement) {
      unblock(m.target);
    } else if (m.type === "childList") {
      m.addedNodes.forEach((n) => {
        if (n instanceof HTMLVideoElement) unblock(n);
        else if (n.nodeType === 1) unblockAll(n);
      });
    }
  }
}).observe(document, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ["disablepictureinpicture"],
});

document.addEventListener("DOMContentLoaded", () => unblockAll(document));

// Pick the largest video that has loaded data.
function pickVideo() {
  const vids = [...document.querySelectorAll("video")].filter((v) => v.readyState > 0);
  vids.sort((a, b) => b.videoWidth * b.videoHeight - a.videoWidth * a.videoHeight);
  return vids[0];
}

async function togglePiP() {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      return;
    }
    const v = pickVideo();
    if (!v) return;
    unblock(v);
    await v.requestPictureInPicture();
  } catch (e) {
    console.warn("[Force PiP]", e);
  }
}

// Alt+P (a real key press counts as the user gesture Chrome requires)
window.addEventListener(
  "keydown",
  (e) => {
    if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyP") {
      e.preventDefault();
      togglePiP();
    }
  },
  true
);

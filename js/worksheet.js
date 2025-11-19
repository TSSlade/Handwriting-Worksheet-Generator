// ====== DOM REFERENCES ======
const phraseInput = document.getElementById("userPhrase");
const filledText = document.getElementById("filledPhraseText");
const emptyText = document.getElementById("emptyPhraseText");
const guidelinesText = document.getElementById("guidelinesPhraseText");

const imageUpload = document.getElementById("imageUpload");
const quadImages = Array.from(document.querySelectorAll(".quad-image"));
const pdfWarning = document.getElementById("pdfWarning");

const worksheetPage = document.getElementById("worksheetPage");
const downloadBtn = document.getElementById("downloadPdfBtn");

// ====== TEXT HANDLING ======

function setPhrase(text) {
  const safe = text || "Something fun to write goes here.";

  filledText.textContent = safe;
  emptyText.textContent = safe;
  guidelinesText.textContent = safe;

  // Refits text to container width for each line.
  [filledText, emptyText, guidelinesText].forEach(fitTextToContainer);
}

/**
 * Shrink the text horizontally (and vertically) so that it fits within
 * its parent width. This assumes the text is single-line.
 */
function fitTextToContainer(el) {
  const parent = el.parentElement;

  if (!parent) return;

  // Reset scale first so we can measure the natural width.
  el.style.transform = "scale(1)";

  // Slight timeout can help once fonts are loaded; in JSFiddle this is usually fine without.
  requestAnimationFrame(() => {
    const parentWidth = parent.clientWidth;
    const textWidth = el.scrollWidth;

    if (parentWidth <= 0 || textWidth <= 0) return;

    const scale = Math.min(1, parentWidth / textWidth);
    el.style.transformOrigin = "left center";
    el.style.transform = `scale(${scale})`;
  });
}

// Initialize phrase with default text.
setPhrase(phraseInput.value);

// Update when user types.
phraseInput.addEventListener("input", () => {
  setPhrase(phraseInput.value.trim());
});

// Re-fit on window resize.
window.addEventListener("resize", () => {
  [filledText, emptyText, guidelinesText].forEach(fitTextToContainer);
});

// ====== IMAGE HANDLING ======

imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    clearImages();
    return;
  }

  if (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  ) {
    // PDFs are allowed but not rendered for the quadrant activity.
    clearImages();
    pdfWarning.classList.remove("hidden");
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file (JPG, PNG, GIF, WEBP) or a PDF.");
    imageUpload.value = "";
    clearImages();
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    quadImages.forEach((img) => {
      img.src = dataUrl;
    });
    pdfWarning.classList.add("hidden");
  };
  reader.readAsDataURL(file);
});

function clearImages() {
  quadImages.forEach((img) => {
    img.removeAttribute("src");
  });
}

// ====== PDF EXPORT (LANDSCAPE LETTER, 0.25" MARGINS) ======

function hidePageDecorationsForPDF() {
  worksheetPage.classList.add("pdf-clean");
}

function restorePageDecorations() {
  worksheetPage.classList.remove("pdf-clean");
}

downloadBtn.addEventListener("click", () => {
  hidePageDecorationsForPDF();

  const element = worksheetPage;
  const rect = element.getBoundingClientRect();
  const pdfWidth = Math.round(rect.width);
  const pdfHeight = Math.round(rect.height);

  const opt = {
    margin: 0,
    filename: "worksheet.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY
    },
    jsPDF: {
      unit: "px",
      format: [pdfWidth, pdfHeight],
      orientation: "landscape"
    },
    pagebreak: { mode: "none" }
  };

  const clone = worksheetPage.cloneNode(true);
  clone.style.margin = "0";
  clone.style.boxShadow = "none";
  clone.style.border = "none";
  clone.style.background = "white";

html2pdf().set(opt).from(clone).save();
  // html2pdf()
  //   .set(opt)
  //   .from(element)
  //   .save()
  //   .then(restorePageDecorations);
});

// === AUTO-GENERATE GUIDELINES ===================================
function fillGuidelinesSpan(span) {
  // Use whatever glyph your guidelines font expects
  const glyph = span.dataset.glyph || "a";

  // Just repeat a bunch of times so we overflow the container width.
  // 200–400 is usually plenty; you can bump this if needed.
  const COUNT = 300;

  span.textContent = glyph.repeat(COUNT);
}

function fillAllGuidelines() {
  document.querySelectorAll(".guidelines-fill").forEach(fillGuidelinesSpan);
}

// Make sure we fill once the page is loaded
window.addEventListener("load", fillAllGuidelines);

// Re-fill on resize if you want; not strictly necessary but harmless
window.addEventListener("resize", fillAllGuidelines);

// If the browser supports the Font Loading API, also wait for fonts
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fillAllGuidelines);
}

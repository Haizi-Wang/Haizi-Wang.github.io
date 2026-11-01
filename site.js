const copy = {
    zh: {
        lede: "彼此听一听，说说在德国的生活。"
    },
    en: {
        lede: "Stories of everyday life in Germany, told in our own words."
    },
    de: {
        lede: "Alltagsgeschichten aus Deutschland, mit eigenen Worten erzählt."
    }
};

function currentLang() {
    const saved = localStorage.getItem("haizi-lang");
    return copy[saved] ? saved : "zh";
}

function apply(lang) {
    localStorage.setItem("haizi-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
    const text = copy[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        if (text[key]) el.textContent = text[key];
    });
    document.querySelectorAll(".langs button").forEach((btn) => {
        btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
    });
}

document.querySelectorAll(".langs button").forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.lang));
});

apply(currentLang());
